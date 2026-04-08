import { chromium, type Page, type BrowserContext, type Browser } from '@playwright/test';

/**
 * SKRYPT DEMO: Inteligentny Lead Generation 2.0
 * Użycie: npx tsx scripts/demo-lead-gen.ts "warsztat samochodowy poznań"
 */

async function performSmartAudit(page: Page, url: string) {
  const audit = { isMobileFriendly: false, aiSummary: '', criticalIssues: [] as string[] };
  try {
    // Szybki ładunek strony
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });
    
    // 1. TEST RESPONSYWNOŚCI (Bardziej rzetelny)
    const viewport = page.viewportSize();
    const hasHorizontalScroll = await page.evaluate((vw) => {
      // Sprawdzamy czy jakikolwiek element wychodzi poza viewport
      return document.documentElement.scrollWidth > (vw?.width || window.innerWidth);
    }, viewport);
    
    audit.isMobileFriendly = !hasHorizontalScroll;
    
    // 2. TEST TECHNICZNY
    const content = await page.content();
    if (!content.includes('<meta name="viewport"')) audit.criticalIssues.push('Stara technologia (brak Mobile Viewport)');
    if (!url.startsWith('https')) audit.criticalIssues.push('Brak SSL (Niezabezpieczona)');
    
    // 3. LEAD SCORING
    if (!audit.isMobileFriendly || audit.criticalIssues.length > 0) {
      audit.aiSummary = "🔥 KRYTYCZNY: Strona wymaga modernizacji!";
    } else {
      audit.aiSummary = "✅ STABILNY: Strona wygląda profesjonalnie.";
    }
  } catch (_e) { 
    audit.aiSummary = "⚠️ BRAK DANYCH (Strona zbyt wolna/zablokowana)";
  }
  return audit;
}

async function findEmailAndStatus(browser: Browser, url: string) {
  if (!url || url === '' || url.includes('google.com')) return { email: '', audit: null as any };
  
  // Tworzymy dedykowany context dla audytu (udajemy iPhone 12)
  const auditContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true
  });

  const page = await auditContext.newPage();
  let email = '';
  const audit = await performSmartAudit(page, url);
  
  try {
    const content = await page.content();
    const matches = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (matches) {
      const uniqueEmails = Array.from(new Set(matches.filter((e: string) => !e.match(/\.(png|jpg|js|css|svg|webp)$/i))));
      email = (uniqueEmails[0] as string) || '';
    }
  } catch (_e) {} finally { 
    await page.close(); 
    await auditContext.close();
  }
  return { email, audit };
}

async function handleConsent(page: Page) {
  console.log('      🛡️  Obsługa zgód Google...');
  try {
    const acceptBtn = page.getByRole('button', { name: /zaakceptuj wszystko|accept all|zgadzam się|agree/i }).first();
    if (await acceptBtn.isVisible({ timeout: 5000 })) {
      await acceptBtn.click();
      console.log('      ✅ Zgody zaakceptowane.');
      await page.waitForLoadState('networkidle');
    }
  } catch (_e) { }
}

async function startDemo(query: string) {
  console.log(`\n🚀 START DEMO: "${query}"`);
  const browser = await chromium.launch({ headless: false }); // Headless: false dla widowiskowości
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'pl-PL' }); 
  const page = await context.newPage();

  try {
    // 1. WEJŚCIE NA MAPY
    await page.goto('https://www.google.com/maps?hl=pl', { waitUntil: 'domcontentloaded' });
    await handleConsent(page);

    // 2. WYSZUKIWANIE
    console.log('      🔍 Wyszukiwanie firm w czasie rzeczywistym...');
    const searchBox = page.locator('#searchboxinput, input[name="q"], .searchboxinput').first();
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await searchBox.click();
    await searchBox.fill(query);
    await searchBox.press('Enter');

    // 3. ANALIZA WYNIKÓW
    try {
      await page.waitForSelector('div[role="feed"], .Nv2PK', { timeout: 15000 });
    } catch (_e) {
      console.log('      ⚠️  Nie znaleziono feedu (może tylko jeden wynik?). Kontynuuję...');
    }
    
    await page.waitForTimeout(2000); // Mała pauza na stabilizację renderowania list
    const resultCards = await page.locator('div.Nv2PK').all();
    
    console.log(`📦 Znaleziono ${resultCards.length} potencjalnych leadów. Rozpoczynam AUDYT...\n`);

    let processedCount = 0;
    for (const card of resultCards.slice(0, 5)) {
      try {
        const nameElement = card.locator('.qBF1Pd').first();
        const name = await nameElement.textContent() || 'Firma';
        
        await card.click();
        
        // Stabilizacja: Czekaj aż nagłówek w panelu bocznym będzie miał tę samą nazwę
        const sidebarTitle = page.locator('h1.DUwDvf').first();
        await sidebarTitle.waitFor({ state: 'visible', timeout: 5000 });
        
        // Pobierz link do strony
        const websiteElement = page.locator('a[data-item-id="authority"]').first();
        const website = await websiteElement.getAttribute('href').catch(() => '');
        
        // Audyt strony
        const { email, audit } = await findEmailAndStatus(browser, website);

        processedCount++;
        console.log(`[${processedCount}/5] FIRMA: ${name.trim()}`);
        if (website) {
          console.log(`   🔗 WWW: ${website}`);
          console.log(`   📧 EMAIL: ${email || 'Nie znaleziono'}`);
          if (audit) {
            console.log(`   📱 MOBILE FRIENDLY: ${audit.isMobileFriendly ? '✅' : '❌'}`);
            console.log(`   🤖 AI SCORING: ${audit.aiSummary}`);
            if (audit.criticalIssues.length > 0) console.log(`   ⚠️ PROBLEMY: ${audit.criticalIssues.join(', ')}`);
          }
        } else {
          console.log(`   ⚪ BRAK STRONY WWW: Klient nie istnieje w sieci! (ZŁOTY LEAD)`);
        }
        console.log(`--------------------------------------------------\n`);
        
        // Krótka przerwa między firmami dla zachowania pozorów "ludzkiego" bota
        await page.waitForTimeout(1000 + Math.random() * 1000);
      } catch (_e) { }
    }
  } finally { 
    console.log('🏁 KONIEC DEMO. Wszyscy "Krytyczni" to Twoi nowi klienci!');
    await browser.close(); 
  }
}

const query = process.argv[2] || 'warsztat samochodowy poznań';
startDemo(query);
