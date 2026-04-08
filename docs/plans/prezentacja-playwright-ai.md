---
marp: true
theme: default
paginate: true
backgroundColor: #0d1117
color: #c9d1d9
style: |
  section {
    font-family: 'Inter', sans-serif;
    justify-content: center;
  }
  h1 {
    color: #58a6ff;
    border-bottom: 2px solid #30363d;
    font-size: 1.8em;
  }
  h2 {
    color: #7ee787;
    font-size: 1.3em;
  }
  h3 {
    color: #ffa657;
    font-size: 1.1em;
  }
  code {
    background: #161b22;
    color: #ff7b72;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
---

# 🎤 Playwright dla niecierpliwych
## Jak w 3 dni stworzyłem testy, których zawsze się bałem

**Teza:** Nie musisz być ekspertem, by tworzyć potężne narzędzia. AI wypłaszcza krzywą nauki i pozwala skupić się na rozwiązaniu, a nie na składni.

**Moja droga:** 0 wiedzy o Playwright ➡️ 3 dni z AI ➡️ Działający system lead-gen.

---

# 🚀 1. Moja Historia: Od zera do Scrapera
- **Dzień 1: Przełamanie strachu.** 
  - Pierwsze `npx playwright install` i szok: "To naprawdę działa?".
- **Dzień 2: Rozwiązywanie realnych problemów.** 
  - Budowa scrapera. Walka z banerami cookies wygrana dzięki trafnym promptom.
- **Dzień 3: Zrozumienie potencjału.** 
  - Playwright to nie tylko testy. To **"ręce i oczy"** dla mojej sztucznej inteligencji.
- **Vibe Coding:** Nie pisałem kodu od zera. Dyrygowałem jego powstawaniem.

---

# 📉 2. Dlaczego AI zmienia zasady gry?
### Koniec z "Doliną Rozpaczy"

<div class="columns">
<div>

**Stara szkoła (Samotna walka):**
- Tygodnie na naukę API na pamięć.
- Frustrujące szukanie błędów w Google.
- "Flaky tests", których nie umiesz naprawić.
- Skupienie na **składni**.

</div>
<div>

**Nowa szkoła (Z asystentem):**
- **Budujesz i uczysz się jednocześnie.**
- Błąd = Sekunda rozmowy z mentorem AI.
- Szybka nagroda (Działający kod w 5 min).
- Skupienie na **celu biznesowym**.

</div>
</div>

---

# 🔍 3. Case Study: Inteligentny Lead Gen
### Jak mój skrypt "widzi" błędy innych?

- **Heurystyka, nie magia:** AI nauczyło skrypt rozpoznawać słabe strony WWW:
    - **Viewport Check:** "Czy ta strona rozjeżdża się na moim telefonie?".
    - **SSL/Tech Check:** "Czy to bezpieczne? Jak stary jest ten kod?".
- **Lead Scoring:** Automatyczna ocena: 🔥 KRYTYCZNY (Klient na już) vs ✅ STABILNY.
- **Data Scraping:** Omijanie blokad poprzez emulację zachowań ludzkich.

---

# 🛠️ 4. Co mnie najbardziej zaskoczyło?
### "Magiczne" funkcje, które odkryłem w Playwright

- **Auto-waiting:** Skrypt "czuje", kiedy strona jest gotowa. Koniec z ręcznym czekaniem.
- **Resilient Locators:** Szukamy po **roli** (np. "przycisk"), a nie po kruchych klasach CSS.
- **UI Mode:** Podróż w czasie. Widzę co działo się na każdym etapie testu.
- **Trace Viewer:** Czarna skrzynka. Nagranie każdego kliknięcia i błędu.

---

# 🚑 5. Lekcje od mojego Mentora AI
### Czego nauczyłem się o architekturze (w 3 dni!)

<div class="columns">
<div>

### Page Object Model (POM)
- Porządek w kodzie: 1 plik = 1 strona.
- AI pokazało mi, jak nie zrobić "spaghetti code".

### Izolacja (Contexts)
- Każdy test to czysta karta.
- Szybkość: "Incognito" zamiast nowej przeglądarki.

</div>
<div>

### Protokół CDP
- "Bezpośrednia rozmowa" z przeglądarką.
- Stabilność, której brakowało mi wcześniej.

### `page.evaluate()`
- Jak "wstrzyknąć" zmysły AI do środka strony.
- Czytanie danych ukrytych głęboko w kodzie.

</div>
</div>

---

# 🧠 6. Przyszłość: Playwright MCP
### Kiedy AI zaczyna działać za Ciebie

- **Context Window:** Playwright to "oczy" AI (widzi DOM, błędy, zrzuty ekranu).
- **Tool Use:** AI traktuje Playwrighta jak zestaw narzędzi do klikania i pisania.
- **Autonomia:** Od pisania testów do **realizacji zadań** (np. "Zarezerwuj lot").
- **Moja rola:** Ja tylko podaję cel. AI orkiestruje narzędzia.

---

# 🎭 7. Demo – Moment Prawdy
### Zobaczmy to w akcji!

1. **E2E Quote Generator:** Playwright wypełnia formularz mojej aplikacji szybciej niż ja.
2. **UI Mode & Time Travel:** Zobacz, jak cofamy czas, by zrozumieć błąd.
3. **Inteligentny Scraper:** 5 potencjalnych klientów z Google Maps w 30 sekund.

---

# 🌟 8. Moje Złote Prompty
### "Cheat-codes", których używałem

- **Setup:** „Dodaj Playwright do Angulara, port 4200. Przeprowadź mnie przez to.”
- **Healing:** „Wklejam HTML, znajdź stabilny selektor, który przetrwa zmianę designu.”
- **Logic:** „Napisz klasę POM dla tego formularza. Nazwij metody po ludzku.”

---

# 🎤 9. Podsumowanie
- **Vibe Coding to nie droga na skróty – to nowa definicja inżynierii.**
- **AI to Twój najcierpliwszy mentor:** Uczy architektury w trakcie budowania.
- **QA jutra to AI Orchestrator:** Liczy się pomysł i jasna intencja.
- **Zacznij budować dziś.** Bariery właśnie zniknęły.

---

# 🚀 Komendy do zapamiętania
- `npx tsx scripts/demo-lead-gen.ts "mechanik poznań"`
- `npx playwright test --ui`
- `npx playwright test tests/e2e/quote-generator.spec.ts --headed`
