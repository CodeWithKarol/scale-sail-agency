import { chromium, type Page, type BrowserContext } from '@playwright/test';

/**
 * SKRYPT DEMO: Inteligentny Lead Generation 2.0
 * Użycie: npx tsx scripts/demo-lead-gen.ts "warsztat samochodowy poznań"
 */

async function performSmartAudit(page: Page, url: string) {
  const audit = { isMobileFriendly: false, aiSummary: '', criticalIssues: [] as string[] };
  try {
    // Szybki ładunek strony (timeout 10s)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    // 1. TEST RESPONSYWNOŚCI (Zmysły AI)
    const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    audit.isMobileFriendly = !hasHorizontalScroll;
    
    // 2. TEST TECHNICZNY (Wiek strony)
    const content = await page.content();
    if (!content.includes('<meta name="viewport"')) audit.criticalIssues.push('Stara technologia (brak Mobile Viewport)');
    if (!url.startsWith('https')) audit.criticalIssues.push('Brak SSL (Niezabezpieczona)');
    
    // 3. LEAD SCORING
    if (!audit.isMobileFriendly || audit.criticalIssues.length > 0) {
      audit.aiSummary = "🔥 KRYTYCZNY: Strona wymaga modernizacji!";
    } else {
      audit.aiSummary = "✅ STABILNY: Strona wygląda profesjonalnie.";
    }
  } catch (e) { 
    audit.aiSummary = "⚠️ BRAK DANYCH (Strona zbyt wolna)";
  }
  return audit;
}

async function findEmailAndStatus(context: BrowserContext, url: string) {
  if (!url || url === '' || url.includes('google.com')) return { email: '', audit: null };
  const page = await context.newPage();
  let email = '';
  const audit = await performSmartAudit(page, url);
  try {
    const content = await page.content();
    const matches = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (matches) email = matches.filter(e => !e.match(/\.(png|jpg|js)$/i))[0] || '';
  } catch (e) {} finally { await page.close(); }
  return { email, audit };
}

async function handleConsent(page: Page) {
  console.log('      🔍 Omijanie banera zgód Google...');
  try {
    await page.waitForTimeout(1000);
    const acceptBtn = page.getByRole('button', { name: /zaakceptuj wszystko|accept all|zgadzam się/i }).first();
    if (await acceptBtn.isVisible({ timeout: 2000 })) {
      await acceptBtn.click();
      console.log('      ✅ Zgody zaakceptowane.');
      return;
    }
  } catch (e) { }
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
    await page.waitForTimeout(1000);
    await page.keyboard.type(query);
    await page.keyboard.press('Enter');

    // 3. ANALIZA WYNIKÓW
    await page.waitForSelector('div[role="feed"]', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    const resultCards = await page.locator('div.Nv2PK').all();
    
    console.log(`📦 Znaleziono ${resultCards.length} firm. Rozpoczynam INTELIGENTNY AUDYT...\n`);

    for (const card of resultCards.slice(0, 5)) {
      try {
        const name = await card.locator('.qBF1Pd').textContent() || 'Firma';
        await card.click();
        await page.waitForTimeout(1500);
        
        const website = await page.locator('a[data-item-id="authority"]').first().getAttribute('href').catch(() => '');
        
        // Audyt strony w nowej zakładce
        const { email, audit } = await findEmailAndStatus(context, website);

        console.log(`--------------------------------------------------`);
        console.log(`🏢 FIRMA: ${name.trim()}`);
        console.log(`📧 EMAIL: ${email || 'Nie znaleziono'}`);
        if (audit) {
          console.log(`📱 MOBILE FRIENDLY: ${audit.isMobileFriendly ? '✅' : '❌'}`);
          console.log(`🤖 AI SCORING: ${audit.aiSummary}`);
          if (audit.criticalIssues.length > 0) console.log(`⚠️ PROBLEMY: ${audit.criticalIssues.join(', ')}`);
        } else {
          console.log(`⚪ BRAK STRONY WWW: Klient nie istnieje w sieci!`);
        }
        console.log(`--------------------------------------------------\n`);
      } catch (e) { }
    }
  } finally { 
    console.log('🏁 KONIEC DEMO. Wszyscy "Krytyczni" to Twoi nowi klienci!');
    await browser.close(); 
  }
}

const query = process.argv[2] || 'warsztat samochodowy poznań';
startDemo(query);
