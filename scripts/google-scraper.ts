import { chromium, type Page, type BrowserContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Funkcja do obsługi zgód/cookie na zewnętrznych stronach warsztatów
async function handleWebsiteConsent(page: Page) {
  try {
    const commonSelectors = [
      'button:has-text("Akceptuję")',
      'button:has-text("Zgadzam się")',
      'button:has-text("Accept")',
      'button:has-text("OK")',
      'button:has-text("Przyjmuję")',
      'button:has-text("Zapisz i zamknij")',
      '#cookie-accept',
      '.cookie-btn',
      '[aria-label="Akceptuję"]',
    ];

    for (const selector of commonSelectors) {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 1500 })) {
        await btn.click();
        // console.log(`      ↳ Cookie baner obsłużony (${selector})`);
        break;
      }
    }
  } catch (e) {
    // Nie blokujemy jeśli nie znajdzie
  }
}

// Funkcja pomocnicza do szukania e-maila na stronie WWW
async function findEmailAndStatus(
  context: BrowserContext,
  url: string,
): Promise<{ email: string; websiteStatus: string }> {
  if (!url || url === '' || url.includes('google.com'))
    return { email: '', websiteStatus: 'NO_WEBSITE' };

  const page = await context.newPage();
  let status = 'OK';
  let email = '';

  try {
    // Próbujemy wejść na stronę
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    if (!response || !response.ok()) {
      status = 'BROKEN';
    } else {
      await handleWebsiteConsent(page);

      // 1. Szukamy linków mailto:
      const mailto = await page
        .locator('a[href^="mailto:"]')
        .first()
        .getAttribute('href')
        .catch(() => null);
      if (mailto) {
        email = mailto.replace('mailto:', '').split('?')[0];
      }

      // 2. Szukamy Regexem jeśli mailto zawiedzie
      if (!email) {
        const content = await page.content();
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = content.match(emailRegex);
        if (matches && matches.length > 0) {
          const validEmails = matches.filter(
            (e) => !e.match(/\.(png|jpg|jpeg|gif|svg|webp|css|js)$/i),
          );
          email = validEmails.length > 0 ? validEmails[0] : '';
        }
      }
    }
  } catch (e) {
    status = 'BROKEN'; // Strona nie odpowiada, timeout itp.
  } finally {
    await page.close();
  }

  return { email, websiteStatus: status };
}

async function handleConsent(page: Page) {
  try {
    const consentSelectors = [
      'button:has-text("Zaakceptuj wszystko")',
      'button:has-text("Accept all")',
      '#L2AGLb',
    ];
    for (const selector of consentSelectors) {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForLoadState('networkidle');
        return;
      }
    }
  } catch (e) {}
}

async function scrapeGoogleMaps(query: string) {
  console.log(`\n🚀 Start: "${query}" (szukanie e-maili i błędnych stron)`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'pl-PL',
  });

  const page = await context.newPage();

  try {
    await page.goto('https://www.google.com/maps', { waitUntil: 'domcontentloaded' });
    await handleConsent(page);

    const searchBox = page.locator('input#searchboxinput, input[name="q"]').first();
    await searchBox.waitFor({ state: 'visible', timeout: 15000 });
    await searchBox.fill(query);
    await searchBox.press('Enter');

    const feedSelector = 'div[role="feed"]';
    try {
      await page.waitForSelector(feedSelector, { timeout: 15000 });
    } catch (e) {}

    const feed = page.locator(feedSelector).first();
    for (let i = 0; i < 2; i++) {
      // Mała liczba dla testu, zwiększ dla produkcji
      await feed.evaluate((el) => (el.scrollTop = el.scrollHeight));
      await page.waitForTimeout(2000);
    }

    const resultCards = await page.locator('div.Nv2PK').all();
    console.log(`📦 Znaleziono ${resultCards.length} firm. Analizuję...`);

    const results = [];

    for (const card of resultCards) {
      try {
        const name = await card.locator('.qBF1Pd').textContent();
        if (!name) continue;

        await card.click();
        await page.waitForTimeout(1000);

        const website = await page
          .locator('a[data-item-id="authority"]')
          .first()
          .getAttribute('href')
          .catch(() => '');
        const phone = await page
          .locator('button[data-item-id^="phone:tel:"]')
          .first()
          .getAttribute('aria-label')
          .then((t) => t?.replace('Telefon: ', '').replace('Phone: ', '') || '')
          .catch(() => '');

        // Głęboka analiza strony WWW
        const { email, websiteStatus } = await findEmailAndStatus(context, website);

        const statusIcon = websiteStatus === 'BROKEN' ? '❌' : websiteStatus === 'OK' ? '🌐' : '⚪';
        console.log(
          `${statusIcon} ${name.trim().padEnd(30)} | Tel: ${phone.padEnd(15)} | Email: ${email || '---'}`,
        );

        results.push({
          name: name.trim(),
          phone: phone.trim(),
          website: website,
          email: email,
          websiteStatus: websiteStatus,
          scrapedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error(`⚠️ Błąd przy firmie:`, e);
      }
    }

    const outputDir = path.join(process.cwd(), 'scripts', 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const outputFile = path.join(outputDir, `leads-${query.replace(/\s+/g, '-')}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`\n✅ Raport zapisany: ${outputFile}`);
    console.log(`💡 Firmy z oznaczeniem BROKEN to potencjalni klienci na nową stronę WWW.`);
  } catch (error) {
    console.error('❌ Błąd:', error);
  } finally {
    await browser.close();
  }
}

const searchQuery = process.argv[2] || 'warsztat samochodowy warszawa';
scrapeGoogleMaps(searchQuery);
