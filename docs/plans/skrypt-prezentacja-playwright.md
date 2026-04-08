# 🎙️ Skrypt Lektorski: Playwright dla niecierpliwych
## Temat: "Jak w 3 dni stworzyłem testy, których zawsze się bałem"
**Czas trwania:** ok. 15-20 minut (wliczając Demo)

---

### 🟢 Slajd 0: Tytuł i Teza (2 min)
**Wskazówka:** Stań pewnie, weź oddech. Zacznij od pytania do sali.

**Tekst:**
"Cześć wszystkim! Zanim zaczniemy, mam do Was pytanie: Kto z Was poczuł kiedyś ten charakterystyczny skurcz w żołądku, gdy musiał nauczyć się nowej, skomplikowanej technologii 'na wczoraj'? 

Ja byłem w tym miejscu dokładnie tydzień temu. Patrzyłem na Playwrighta i widziałem tylko gąszcz dokumentacji, asynchroniczność i selektory, które śniły mi się po nocach. Dzisiaj stoję przed Wami nie jako ekspert, ale jako ktoś, kto oswoił tę bestię w 3 dni. 

Moja teza na dziś brzmi: W 2026 roku nie musisz być ekspertem od kodu. Musisz mieć jasną intencję. Playwright to nie są tylko testy – to 'oczy i ręce' dla Twojej sztucznej inteligencji. Pokażę Wam, jak to zmieniło moje życie jako inżyniera."

---

### 🚀 Slajd 1: Moja Historia (2 min)
**Wskazówka:** Mów o emocjach – od strachu do euforii.

**Tekst:**
"Moja droga to były zaledwie trzy kroki. 
**Dzień 1: Przełamanie strachu.** Zacząłem od najprostszego promptu: 'Jak to zainstalować?'. Kiedy zobaczyłem, jak Playwright sam pobiera przeglądarki i uruchamia pierwszy test, poczułem pierwszy dreszcz emocji. To naprawdę działało!
**Dzień 2: Rozwiązywanie problemów.** Budowałem scraper. Największym wrogiem były banery cookies i dynamiczne strony. Zamiast płakać nad StackOverflow, prowadziłem dialog z moim asystentem AI. 'Słuchaj, on nie widzi tego przycisku, co robimy?'. I znajdowaliśmy rozwiązanie w sekundy.
**Dzień 3: Olśnienie.** Wtedy zrozumiałem, że Playwright to brakujące ogniwo. AI ma mózg, ale potrzebuje zmysłów, by dotykać stron internetowych. To właśnie nazywam **Vibe Codingiem** – dyrygowałem powstawaniem kodu, zamiast go mozolnie klepać."

---

### 📉 Slajd 2: Dlaczego AI zmienia zasady gry? (2 min)
**Wskazówka:** Wskaż na różnice między "Starą" a "Nową" szkołą.

**Tekst:**
"Spójrzcie na ten wykres. Tradycyjna nauka to 'Dolina Rozpaczy'. Tygodnie kucia API na pamięć, zanim napiszesz coś użytecznego. My tę drogę po prostu wyrównaliśmy. 
W **Starej szkole** skupiasz się na składni. Walczysz z błędami, których nie rozumiesz. W **Nowej szkole** budujesz i uczysz się jednocześnie. Błąd nie jest końcem świata – jest początkiem ciekawej rozmowy z mentorem AI. Dostajesz szybką nagrodę: działający kod w 5 minut. To sprawia, że Twoje skupienie przesuwa się ze składni na cel biznesowy."

---

### 🔍 Slajd 3: Case Study – Misja: Ratowanie warsztatów (2 min)
**Wskazówka:** Opowiedz to jak historię o pomaganiu ludziom.

**Tekst:**
"Chciałem sprawdzić tę teorię w boju. Stworzyłem skrypt `google-scraper.ts`. Jego misja? Znaleźć lokalne warsztaty, które tracą pieniądze przez słabe strony WWW. 
Mój skrypt 'widzi' błędy innych. Robi **Viewport Check** – udaje telefon i sprawdza, czy strona się nie sypie. Wykonuje **SSL & Tech Check** – patrzy, czy strona jest bezpieczna i czy nie pachnie technologią sprzed dekady. Na koniec AI wystawia ocenę: 🔥 KRYTYCZNY. To dla mnie sygnał: 'Ten człowiek potrzebuje Twojej pomocy'. To nie jest już tylko testowanie – to inteligentny biznes."

---

### 🛠️ Slajd 4: Co mnie najbardziej zaskoczyło? (2 min)
**Wskazówka:** Pokaż, że technologia może być ekscytująca nawet dla nowicjusza.

**Tekst:**
"Pod maską Playwrighta odkryłem funkcje, które dla mnie są czystą magią. 
**Auto-waiting:** Skrypt ma niesamowitą cierpliwość. Sam wie, kiedy element jest gotowy do kliknięcia. Zapomnijcie o ręcznych pauzach.
**Resilient Locators:** Szukamy przycisku po jego roli, a nie po kolorze czy ID. To sprawia, że test jest 'pancerny'.
Ale hitem jest **UI Mode** i **Trace Viewer**. To jak czarna skrzynka w samolocie. Mogę cofnąć czas i zobaczyć stan aplikacji w milisekundzie, w której wystąpił błąd. To daje niesamowitą pewność siebie, nawet gdy dopiero zaczynasz."

---

### 🚑 Slajd 5: Lekcje od mojego Mentora AI (2 min)
**Wskazówka:** Podkreśl, że AI nie tylko wyręcza, ale uczy dobrych praktyk.

**Tekst:**
"Najbardziej wartościowe było to, że AI uczyło mnie architektury. Zaproponowało **Page Object Model**. Brzmi skomplikowanie? To po prostu klocki Lego – każda strona ma swój osobny plik z instrukcją. To uczy porządku od pierwszego dnia. 
Dowiedziałem się o **Protokole CDP** – to taka 'bezpośrednia rozmowa' z przeglądarką, bez pośredników. Dowiedziałem się o **Izolacji** – każdy test to czysta karta, co daje prędkość światła. To była przyspieszona lekcja inżynierii, której normalnie uczyłbym się miesiącami."

---

### 🧠 Slajd 6: Przyszłość: Playwright MCP (1.5 min)
**Wskazówka:** Buduj wizję czegoś wielkiego.

**Tekst:**
"To, co widzicie dzisiaj, to tylko wierzchołek góry lodowej. Standard **MCP** łączy mózg AI z rękami Playwrighta. Playwright dostarcza 'okno na świat', a AI traktuje go jak zestaw narzędzi. 
Wkrótce przestaniemy pisać skrypty. Będziemy podawać **cele**. Powiesz: 'Zarezerwuj mi warsztat na wtorek', a Twój agent AI wejdzie na stronę, przejdzie przez formularze i załatwi sprawę. My przestajemy być klepaczami kodu, stajemy się dyrygentami."

---

### 🎭 Slajd 7: Demo – Moment Prawdy (3-5 min)
**Wskazówka:** Przełącz się na terminal. Zrób pauzę. To Twój show!

**Tekst:**
"Czas na Live Demo! 
Zobaczymy najpierw, jak Playwright testuje mój **Quote Generator** – zobaczcie, jak błyskawicznie wypełnia dane Audi A4 i liczy marże. 
Potem wejdziemy w **UI Mode**, by 'podróżować w czasie'. 
A na deser – mój **Inteligentny Scraper**. W 30 sekund znajdziemy 5 warsztatów, które potrzebują nowej strony. Patrzcie na terminal – to dzieje się naprawdę."

---

### 🌟 Slajd 8: Moje Złote Prompty (1 min)
**Wskazówka:** Pozwól ludziom wyciągnąć telefony i zrobić zdjęcie.

**Tekst:**
"Jeśli chcecie zacząć jutro, przygotowałem dla Was moje 'cheat-codes'. To te prompty oszczędziły mi tygodnie nauki. 
One uczą AI, jak być Waszym asystentem w Playwright. Od setupu pod Angulara, przez naprawianie kruchych selektorów, aż po budowę architektury. Skopiujcie je, bo to one są kluczem do Waszej nowej produktywności."

---

### 🎤 Slajd 9: Podsumowanie (1.5 min)
**Wskazówka:** Mów wolno, z mocnym przesłaniem.

**Tekst:**
"Kończąc moją opowieść: Vibe Coding to nie jest droga na skróty dla leniwych. To nowa definicja inżynierii. 
AI to najcierpliwszy mentor, jakiego kiedykolwiek spotkacie. QA jutra to nie osoba, która zna API na pamięć, ale **AI Orchestrator** – osoba z wizją i jasną intencją. 
Nie czekajcie, aż poczujecie się gotowi. Zacznijcie budować dziś, bo bariery właśnie zniknęły. Dziękuję Wam bardzo za uwagę!"

---

### 🚀 Twoja "Ściąga" do Demo:
1. `npx playwright test tests/e2e/quote-generator.spec.ts --headed` (Efekt WOW - szybkość)
2. `npx playwright test --ui` (Time Travel - magia debugowania)
3. `npx tsx scripts/demo-lead-gen.ts "mechanik poznań"` (Biznesowy Lead Gen)
