import { chromium, type Page, type BrowserContext, type Browser } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * MODULAR GOOGLE MAPS SCRAPER (v2)
 * Focused on: Stealth, Modularity, and Discovery.
 */

interface Review {
  text: string;
  rating: string;
  date: string;
}

interface BusinessResult {
  name: string;
  website: string;
  phone: string;
  address: string;
  rating?: string;
  reviewCount?: string;
  reviews?: Review[];
  scrapedAt: string;
}

class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  async init(headless: boolean = false) {
    this.browser = await chromium.launch({ 
      headless,
      args: ['--disable-blink-features=AutomationControlled']
    });

    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      viewport: { width: 1440, height: 900 },
      locale: 'pl-PL',
    });
  }

  async newPage(): Promise<Page> {
    if (!this.context) throw new Error('Browser not initialized');
    return await this.context.newPage();
  }

  async close() {
    if (this.browser) await this.browser.close();
  }
}

class MapsDiscovery {
  constructor(private page: Page) {}

  /**
   * Handles Google Consent / Cookies
   */
  async handleConsent() {
    console.log('🛡️  Obsługa zgód Google...');
    try {
      const consentButtons = [
        'button:has-text("Zaakceptuj wszystko")',
        'button:has-text("Accept all")',
        '#L2AGLb'
      ];

      for (const selector of consentButtons) {
        const btn = this.page.locator(selector).first();
        if (await btn.isVisible({ timeout: 5000 })) {
          await btn.click();
          console.log('   ✅ Zgoda zaakceptowana.');
          await this.page.waitForLoadState('networkidle');
          return;
        }
      }
    } catch (e) {
      console.log('   ℹ️  Brak banera cookies lub już obsłużony.');
    }
  }

  /**
   * Triggers the search query
   */
  async search(query: string) {
    console.log(`🔍 Wyszukiwanie: "${query}"...`);
    await this.page.goto('https://www.google.com/maps', { waitUntil: 'networkidle' });
    await this.handleConsent();

    // Multiple selector attempt for the search box
    const selectors = ['input#searchboxinput', 'input.searchboxinput', 'input[name="q"]', '.fontBodyMedium.searchboxinput'];
    let searchInput = null;

    for (const selector of selectors) {
      try {
        const el = this.page.locator(selector).first();
        if (await el.isVisible({ timeout: 5000 })) {
          searchInput = el;
          break;
        }
      } catch (e) {}
    }

    if (!searchInput) {
      // Fallback: try to just click the center of the page if it's a "blank" maps state, or throw
      throw new Error('Nie znaleziono pola wyszukiwania Google Maps.');
    }
    
    // Human-like typing
    await searchInput.click();
    await this.page.waitForTimeout(200 + Math.random() * 300);
    await searchInput.fill(query);
    await this.page.waitForTimeout(100 + Math.random() * 200);
    await searchInput.press('Enter');

    // Wait for the feed or results to appear
    try {
      await this.page.waitForSelector('div[role="feed"], .Nv2PK', { timeout: 15000 });
    } catch (e) {
      console.log('   ⚠️  Feed nie pojawił się (może tylko jeden wynik?). Sprawdzam...');
    }
    console.log('   ✅ Lista wyników załadowana.');
  }

  /**
   * Scrolls the results feed to load all businesses
   */
  async scrollFeed(maxResults: number = 50) {
    // Check if we are already on a business page (direct hit)
    if (await this.page.locator('h1.DUwDvf').isVisible({ timeout: 2000 })) {
      console.log('   ℹ️  Wykryto bezpośredni profil firmy. Pomijam przewijanie listy.');
      return;
    }

    console.log(`📜 Przewijanie listy (max: ${maxResults})...`);
    const feed = this.page.locator('div[role="feed"]').first();
    
    if (!(await feed.isVisible({ timeout: 5000 }))) {
      console.log('   ⚠️  Nie znaleziono listy wyników do przewinięcia.');
      return;
    }

    let lastHeight = 0;
    let noChangeCount = 0;

    while (noChangeCount < 3) {
      const resultsCount = (await this.page.locator('a.hfpxzc').all()).length;
      console.log(`   ↳ Załadowano: ${resultsCount} firm...`);
      
      if (resultsCount >= maxResults) break;

      await feed.evaluate((el) => el.scrollBy(0, 1000));
      await this.page.waitForTimeout(1500 + Math.random() * 1000); // Stealth delay

      const currentHeight = await feed.evaluate((el) => el.scrollHeight);
      if (currentHeight === lastHeight) {
        noChangeCount++;
      } else {
        noChangeCount = 0;
      }
      lastHeight = currentHeight;
    }
    console.log('   ✅ Przewijanie zakończone.');
  }

  /**
   * Clicks and extracts details for each business
   */
  async extractBusinessDetails(limit: number = 20): Promise<BusinessResult[]> {
    const results: BusinessResult[] = [];
    
    // Check if we are on a single business page already
    if (await this.page.locator('h1.DUwDvf').first().isVisible({ timeout: 2000 })) {
      console.log('🏗️  Wyodrębnianie danych z otwartego profilu...');
      const result = await this.extractCurrentBusiness();
      if (result) results.push(result);
      return results;
    }

    const pins = await this.page.locator('a.hfpxzc').all();
    const count = Math.min(pins.length, limit);

    console.log(`🏗️  Wyodrębnianie danych dla ${count} firm...`);

    for (let i = 0; i < count; i++) {
      try {
        // Re-fetch pins to avoid stale element references
        const currentPins = await this.page.locator('a.hfpxzc').all();
        const pin = currentPins[i];
        
        if (!pin) {
          console.log(`   ⚠️ Pin nr ${i+1} zniknął. Pomijam.`);
          continue;
        }

        await pin.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500 + Math.random() * 500);
        await pin.click();

        // Wait for sidebar to load
        await this.page.waitForTimeout(2000 + Math.random() * 1000);

        const name = await this.page.locator('h1.DUwDvf').first().textContent().catch(() => 'Unknown');
        const website = await this.page.locator('a[data-item-id="authority"]').first().getAttribute('href').catch(() => '');
        const phone = await this.page.locator('button[data-item-id^="phone"]').first().getAttribute('aria-label').then(t => t?.replace(/Telefon: |Phone: /g, '')).catch(() => '');
        const address = await this.page.locator('button[data-item-id="address"]').first().getAttribute('aria-label').then(t => t?.replace(/Adres: |Address: /g, '')).catch(() => '');
        
        // --- NEW: EXTRACTION OF REVIEWS ---
        const reviews = await this.extractReviewsForCurrentBusiness(30);

        console.log(`   [${i+1}/${count}] ✅ ${name?.trim()} (${reviews.length} opinii)`);

        results.push({
          name: name?.trim() || 'N/A',
          website: website || '',
          phone: phone?.trim() || '',
          address: address?.trim() || '',
          reviews: reviews,
          scrapedAt: new Date().toISOString()
        });

      } catch (e: any) {
        console.error(`   ⚠️ Błąd przy firmie nr ${i+1}:`, e.message);
      }
    }

    return results;
  }

  /**
   * Helper to extract data from the currently open sidebar
   */
  private async extractCurrentBusiness(): Promise<BusinessResult | null> {
    try {
      const name = await this.page.locator('h1.DUwDvf').first().textContent().catch(() => 'Unknown');
      const website = await this.page.locator('a[data-item-id="authority"]').first().getAttribute('href').catch(() => '');
      const phone = await this.page.locator('button[data-item-id^="phone"]').first().getAttribute('aria-label').then(t => t?.replace(/Telefon: |Phone: /g, '')).catch(() => '');
      const address = await this.page.locator('button[data-item-id="address"]').first().getAttribute('aria-label').then(t => t?.replace(/Adres: |Address: /g, '')).catch(() => '');
      
      const reviews = await this.extractReviewsForCurrentBusiness(30);
      console.log(`   ✅ ${name?.trim()} (${reviews.length} opinii)`);

      return {
        name: name?.trim() || 'N/A',
        website: website || '',
        phone: phone?.trim() || '',
        address: address?.trim() || '',
        reviews: reviews,
        scrapedAt: new Date().toISOString()
      };
    } catch (e) {
      console.error('   ⚠️ Błąd podczas ekstrakcji bieżącej firmy:', e);
      return null;
    }
  }

  /**
   * Navigates to "Reviews" tab and extracts up to [limit] reviews
   */
  private async extractReviewsForCurrentBusiness(limit: number = 30): Promise<Review[]> {
    const reviews: Review[] = [];
    try {
      // 1. Find and click "Opinie" or "Reviews" tab
      const reviewsTab = this.page.locator('button[role="tab"][aria-label*="Opinie"], button[role="tab"][aria-label*="Reviews"]').first();
      if (!(await reviewsTab.isVisible({ timeout: 5000 }))) {
        return []; // No reviews or tab not found
      }
      await reviewsTab.click();
      await this.page.waitForTimeout(1000 + Math.random() * 500);

      // 2. Sort by Newest
      const sortBtn = this.page.locator('button[aria-label*="Sortuj"], button[aria-label*="Sort reviews"], button.HQzyZ').first();
      if (await sortBtn.isVisible({ timeout: 3000 })) {
        await sortBtn.click({ force: true });
        await this.page.waitForTimeout(1000);
        
        const newestOption = this.page.locator('div[role="menuitemradio"]').filter({ hasText: /Najnowsze|Newest/ }).first();
        if (await newestOption.isVisible({ timeout: 2000 })) {
          await newestOption.click();
          await this.page.waitForTimeout(2000);
        }
      }

      // 3. Scroll and Collect
      const scrollable = this.page.locator('div.m6QErb.DxyBCb[scrollable="true"], div[role="main"] div[scrollable="true"]').last();
      
      let prevCount = 0;
      let noChangeCount = 0;

      for (let scrollAttempt = 0; scrollAttempt < 15 && reviews.length < limit; scrollAttempt++) {
        // Use a more specific selector for the review cards
        const elements = await this.page.locator('div.jftiEf, .jfti7').all();
        
        if (elements.length === prevCount) {
          noChangeCount++;
          if (noChangeCount > 3) break;
        } else {
          noChangeCount = 0;
        }

        for (let i = prevCount; i < elements.length && reviews.length < limit; i++) {
          const el = elements[i];
          
          try {
            // Click "More" if exists - improved selectors
            const moreBtn = el.locator('button.w8nwRe.kyuRq, button:has-text("Więcej"), button:has-text("More"), button[aria-label*="Więcej"]').first();
            if (await moreBtn.isVisible({ timeout: 200 })) {
              await moreBtn.click().catch(() => {});
              await this.page.waitForTimeout(300); // Wait for expansion
            }

            // Updated selector: .wiI7pd is the correct one for review text
            const textSelector = '.wiI7pd, .wiI7Te';
            const text = await el.locator(textSelector).first().textContent().catch(() => '');
            
            const ratingSelector = 'span.kvS7ce, .kyv62b, span[aria-label*="gwiazd"], span[aria-label*="stars"]';
            const rating = await el.locator(ratingSelector).first().getAttribute('aria-label').catch(() => '');
            const date = await el.locator('.rsqaWe').first().textContent().catch(() => '');

            if (text || rating) {
              reviews.push({
                text: text?.trim() || '',
                rating: rating?.trim() || '',
                date: date?.trim() || ''
              });
            }
          } catch (err) {}
        }

        prevCount = elements.length;
        console.log(`      ↳ Zebrano ${reviews.length}/${limit} opinii...`);

        if (reviews.length < limit) {
          await scrollable.evaluate((el) => {
            if (el) el.scrollBy(0, 3000);
          }).catch(() => {});
          await this.page.waitForTimeout(2000 + Math.random() * 1000);
        }
      }

      // 4. Go back to main info (to reset state for next business)
      const backBtn = this.page.locator('button[aria-label="Wstecz"], button[aria-label="Back"], button[aria-label="Zamknij"]').first();
      if (await backBtn.isVisible()) await backBtn.click();
      await this.page.waitForTimeout(1000);

    } catch (e: any) {
      console.log(`      ⚠️ Błąd podczas pobierania opinii: ${e.message}`);
    }
    return reviews;
  }
}

async function runScraper(query: string, limit: number = 20) {
  const browserManager = new BrowserManager();
  
  try {
    await browserManager.init(false); // Widoczna przeglądarka dla lepszego "stealth" i kontroli
    const page = await browserManager.newPage();
    const discovery = new MapsDiscovery(page);

    await discovery.search(query);
    await discovery.scrollFeed(limit);
    const data = await discovery.extractBusinessDetails(limit);

    // Save outputs
    const outputDir = path.join(process.cwd(), 'scripts', 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    
    const fileName = `discovery-${query.replace(/\s+/g, '-')}.json`;
    const filePath = path.join(outputDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`\n🎉 Gotowe! Wyniki zapisano w: ${filePath}`);

  } catch (error) {
    console.error('❌ Krytyczny błąd scrapera:', error);
  } finally {
    await browserManager.close();
  }
}

const query = process.argv[2] || 'warsztat samochodowy warszawa';
const limit = parseInt(process.argv[3]) || 20;

runScraper(query, limit);
