# MOJE NEPREMIČNINE
![modified_R](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/643cde52-84ea-4010-8e1e-a91356efab15)

## O "Moje nepremičnine"
**Moje nepremičnine** je spletna aplikacija, namenjena prikazovanju nepremičninskih oglasov iz različnih spletnih strani ter primerjanju med njimi. Stranka je želela platformo, kjer lahko uporabniki pregledujejo, iščejo, primerjajo in filtrirajo ter shranjujejo sebi priljubljene nepremičninske oglase. Naša stran je popolnoma neodvisna od nepremičninskih strani, iz katerih pridobivamo podatke saj si te podatke trajno shranimo. Ne glede na to, ali te strani delujejo ali ne, so podatki na voljo, kar zagotavlja nemoteno delovanje naše strani. Podatke osvežimo po potrebi ali pa na interval.

## ČLANI EKIPE:
 - Aljaž Kodrič (https://github.com/HlapecMihad)
 - Luka Car (https://github.com/carluka)
 - Rok Fonovič (https://github.com/01developer1)

### Funkcionalnosti

- **Pregled oglasov**: Uporabniki lahko pregledujejo nepremičninske oglase z različnih spletnih strani.
- **Iskanje oglasov**: Uporabniki lahko iščejo nepremičnine glede na različne kriterije, kot so lokacija, cena, velikost ipd.
- **Primerjava oglasov**: Uporabniki lahko primerjajo več oglasov med seboj za lažje odločanje.
- **Filtriranje oglasov**: Oglase je mogoče filtrirati glede na različne lastnosti (npr. število sob, leto gradnje, opremljenost ipd.).
- **Shranjevanje priljubljenih oglasov**: Oglase, ki so nam všeč, si lahko shranimo pod priljubljene.
- **Avtomatizacija scraperjev**: Vsako nedeljo ob polnoči se avtomatsko zaženejo scraperji in se posodobi baza
  
### Tehnologije
Aplikacija je sestavljena iz frontend in backend delov:
- **Frontend**: Zgrajen z uporabo React.js, omogoča dinamičen in odziven uporabniški vmesnik.
- **Backend**: Vključuje skripte za zajemanje podatkov (scraping) ter njihovo shranjevanje in obdelavo. Backend je zgrajen z uporabo Spring frameworka.
- **Podatkovna baza**: MongoDB
- **Scraper**: V Python
![image](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/c23b6f8b-6559-4177-a735-83688924a815)


## STRUKTURA PROJEKTA

### FrontEnd
**Direktorij**: `FrontEnd/reactjs-real-estate-template-master`
- **Opis**: Vsebuje kodo za uporabniški vmesnik napisan v React-u.
- **Namestitev odvisnosti**: Pojdite v mapo `FrontEnd/reactjs-real-estate-template-master` in zaženite `npm install`.

### ScraperPart
**Direktorij**: `ScraperPart`
- **Opis**: Skripte napisane v Pythonu za zajemanje podatkov iz različnih spletnih virov.
- **Namestitev odvisnosti**: Prepričajte se, da imate nameščen Python 3, in namestite potrebne odvisnosti z ukazom `pip install -r requirements.txt`.

### Backend
**Direktorij**: `nepremicnine`
- **Opis**: Koda za posredovanje podatkov frontend-u, zgrajena z uporabo Spring frameworka.
- **Namestitev odvisnosti**: Prepričajte se, da imate nameščen JDK 11 ali novejši, in zaženite aplikacijo z ukazom `./mvnw spring-boot:run`.

### Komunikacija med Frontend-om in Backend-om
- **Protokol**: REST
- **Opis**: Komunikacija poteka preko REST API klicev, kjer frontend pošilja zahteve na backend, ki nato vrne ustrezne podatke.
  
## UPORABA
- **Main Branch** je uporabljen za deployment; stran je dostopna na: https://praktikum-2.vercel.app/ (Opomnik: Po določenem času neaktivnosti se backend ustavi (free verzija) in rabi 4-5 min da se vse znova vzpostavi)
- **Development Branch** se uporablja za lokalno rabo

## NAMESTITEV

### Kloniranje repozitorija
1. Odprite terminal ali ukazno vrstico.
2. Za kloniranje repozitorija uporabite naslednji ukaz: `git clone https://github.com/HlapecMihad/PRAKTIKUM2.git`
3. Pojdite v mapo projekta z ukazom `cd PRAKTIKUM2`.

### Namestitev odvisnosti za Frontend
1. Pojdite v mapo s frontend kodo z ukazom `cd FrontEnd/reactjs-real-estate-template-master`.
2. Namestite potrebne odvisnosti z ukazom `npm install`.

### Namestitev odvisnosti za Scraper
1. Pojdite v mapo z Python skriptami z ukazom `cd ScraperPart`.
2. Namestite potrebne odvisnosti z ukazom `pip install -r requirements.txt`.

### Namestitev odvisnosti za Backend
1. Pojdite v mapo z backend kodo z ukazom `cd nepremicnine`.
2. Zaženite aplikacijo z ukazom `./mvnw spring-boot:run`.

## UPORABA APLIKACIJE
1. **Zagon Frontend-a**: V mapi `FrontEnd/reactjs-real-estate-template-master` zaženite `npm start`.
2. **Zagon Backend-a**: V mapi `nepremicnine` zaženite `./mvnw spring-boot:run`.
3. **Zagon Scraper-ja**: V mapi `ScraperPart` zaženite ustrezne skripte za zajem podatkov.

## SHEMA PODATKOV V BAZI
 - Nepremičnina:
    {
        "posredovanje": "Prodaja",
        "link": "https://www.re-max.si/en/listings/condo/apartment/for-sale/portoroz/490111029-48?Lang=sl-SI",
        "tip_nepremicnine": "Stanovanje",
        "location": "Portorož, Primorska Južna",
        "naziv": "Stanovanje - Prodamo - Portorož, Primorska Južna",
        "cena": 258000.0,
        "id_nepremicnine": "490111029-48",
        "st_sob": 2.0,
        "st_spalnic": 1.0,
        "st_kopalnic": 1.0,
        "velikost_skupaj": 72.9,
        "velikost_zemljisca": null,
        "leto_izgradnje": 1980.0,
        "st_nadstropij": null,
        "opis": "V Luciji, Liminjanska, je naprodaj veliko dvosobno stanovanje neto tlorisne površine 70,5 m2 s kletjo 2,4 m2. Stanovanje je v isti etaži kot glavni vhod, t.j v pritličju, balkoni pa so v nadstropju zaradi naklona v terenu.Razporeditev prostorov:- VHODNA VEŽA z garderobno omaro in omarico za čevlje,- DNEVNI PROSTOR Z JEDILNICO z izhodom na balkon,- KUHINJA,- GARDEROBNI HODNIK z omaro,- SPALNICA z izhodom na balkon,- KOPALNICA, obnovljena pred tremi leti ,- 2 VELIKA BALKONA in- KLET.Zunanje stene stanovanja so zastekljene, kar omogoča obilo dnevne svetlobe. Balkona se raztezata čez vso dolžino stanovanja (cca. 9 m). Dnevna soba meri 40 m2, kar omogoča postavitev predelne stene za manjšo spalnico.Stanovanje se prodaja opremljeno.OGREVANJEje urejeno na plin ali na elektriko. Montirana je klima naprava.GARAŽABlok ima podzemne garaže. Na željo kupca je možen tudi nakup garaže za 15.000 €. LOKACIJABlok se nahaja v Luciji na robu pozidanega območja. Obkroža ga veliko zelenih površin. Do morja  in marine je 1 km, do Portoroža 2 km. V bližini so trgovine, obrtna cona, šola, vrtec, športna dvorana, pizzeria.IZPOSTAVLJAMO.- stanovanje je mogoče iz 2 sobnega preurediti v 3 sobno,- mirna lokacija, stran od prometnih cest,- prodaja se opremljeno,- v bližini sta šola in vrtec,- možen tudi nakup garaže,- brez provizije za kupca.Vabljeni na ogled. Pokličite 041 789 111.",
        "lastnosti": [
            "Klima",
            "Ob morju",
            "V bližini morja",
            "Avt. vhodna vrata",
            "Klet/shramba",
            "Kuhinja",
            "Opremljeno",
            "Parket",
            "Obnovljeno",
            "Garaža",
            "Parkirišče"
        ],
        "image_urls": [
            "https://remax.azureedge.net/userimages/49/L_3202371f5ffb402e8c4df63a2d4829e5.jpg",
            "https://remax.azureedge.net/userimages/49/L_23197da92f2b448da873a66e8758f875.jpg",
            "https://remax.azureedge.net/userimages/49/L_507248eafa834e42ba905f2d13cdb1af.jpg",
            "https://remax.azureedge.net/userimages/49/L_8157bca2f60f412eac29555d8fd2ca24.jpg",
            "https://remax.azureedge.net/userimages/49/L_c85fa182c9f4414ab0dfb12d604354db.jpg",
            "https://remax.azureedge.net/userimages/49/L_c5772dd3123a43f2a57961132362f21c.jpg",
            "https://remax.azureedge.net/userimages/49/L_d3b615926f6e43b9b8f6e97ef0b108ef.jpg",
            "https://remax.azureedge.net/userimages/49/L_9427c84663f64f9b8d7f8b378246aadd.jpg",
            "https://remax.azureedge.net/userimages/49/L_1874088263954e898d8d5064440b80c7.jpg",
            "https://remax.azureedge.net/userimages/49/L_68d54726076a40e7896a6502a424cf98.jpg",
            "https://remax.azureedge.net/userimages/49/L_a1f67f33739b4dc5a7b6f81ffdf61ad3.jpg",
            "https://remax.azureedge.net/userimages/49/L_1db4ba20b0f1468c945d50d3b9e0d856.jpg",
            "https://remax.azureedge.net/userimages/49/L_f92a95f119674f1e89a45a6d0eb37170.jpg",
            "https://remax.azureedge.net/userimages/49/L_aa5db4d536eb4242bce0b538eedbc001.jpg",
            "https://remax.azureedge.net/userimages/49/L_1abc4b36eb2d408bb9549c8372d299d5.jpg",
            "https://remax.azureedge.net/userimages/49/L_2c84b3cb360a4f979ba0ab2bcbc6294b.jpg",
            "https://remax.azureedge.net/userimages/49/L_ad1a1384bcda4443b178839a6b637c46.jpg",
            "https://remax.azureedge.net/userimages/49/L_563b87e952c34f55a32eb8295778adc7.jpg",
            "https://remax.azureedge.net/userimages/49/L_1059a63545a74bb8a6a2dcf06a013c1d.jpg",
            "https://remax.azureedge.net/userimages/49/L_8bb4cc7453a74d648b6c73a6680006a0.jpg",
            "https://remax.azureedge.net/userimages/49/L_6dacc38ac99247c08ce0431de3bc488b.jpg",
            "https://remax.azureedge.net/userimages/49/L_9c6a9690d65646fcb28fd0b5cfb56eda.jpg",
            "https://remax.azureedge.net/userimages/49/L_9af0ac1cb50e4fc3a94fe37f96785286.jpg",
            "https://remax.azureedge.net/userimages/49/L_13cad09102e0450cbc4c33378db3c28a.jpg",
            "https://remax.azureedge.net/userimages/49/L_2e32266a83c044568d62786c3bee96a9.jpg",
            "https://remax.azureedge.net/userimages/49/L_4524fa54fdd942f9975d0d6ff0a79fef.jpg"
        ],
        "agencija": "Re-Max"
    }

 - Uporabnik:
     {
    "_id": {
      "$oid": "66645c2f868d4973eb90266f"
    },
    "ime": "Janez",
    "priimek": "Novak",
    "email": "janez.novak@gmail.com",
    "geslo": "$2a$10$eFN360x9GdVW1KlvN9LMSeftjLkB11jvAuZvXrMNlj3OrKCokcjPa",
    "priljubljeneNepremicnine": [
      "66617cd0bc22c1655d0f88aa",
      "66617cd0bc22c1655d0f8901"
    ],
    "_class": "si.primerjanjeCen.nepremicnine.vao.Uporabnik"
  }

## GALERIJA
### Domača stran:
![DomacaStran](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/88c2fca2-029d-4918-8325-62b178f2fbe0)

### Primerjanje nepremičnin:
![PrimerjanjeNepremicnin](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/ae916cbe-c6f3-4dbf-abce-11adf6b1cdf7)

### Priljubljene nepremičnine
![PriljubljeneNepremicnine](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/b219e384-9776-4606-b70b-b9edb4415b6f)

### Prikaz nepremičnin filtri prodaja
![PrikazNepremicninFiltri_Prodaja](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/a1007676-ac11-4978-bc6a-3bffced32dd5)

### Prikaz nepremičnin filtri oddaja
![PrikazNepremicninFiltri_Oddaja](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/95016a76-449e-443f-b19d-9fd9300e8993)

### Prikaz nepremičnin prodaja
![PrikazNepremicnin_Prodaja](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/7c763662-931b-4b13-9890-1fd1a202b2d7)

### Prikaz nepremičnin oddaja
![PrikazNepremicnin_Oddaja](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/6ae0ff06-ba3a-49e4-b0ea-8028140c4d87)

### Nepremičnine podrobno
![PodrobnoNepremicnina](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/3ebdf375-0da4-442b-892d-d5b589ebebd6)


Sedaj lahko dostopate do aplikacije preko lokalnega strežnika in pričnete z iskanjem, pregledovanjem in primerjanjem nepremičnin.
