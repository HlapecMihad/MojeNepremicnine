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
- **Namestitev odvisnosti**: Prepričajte se, da imate nameščen JDK 11 ali novejši, in zaženite aplikacijo z ukazom `mvnw spring-boot:run`.

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
2. Zaženite aplikacijo z ukazom `mvnw spring-boot:run`.

## UPORABA APLIKACIJE
1. **Zagon Frontend-a**: V mapi `FrontEnd/reactjs-real-estate-template-master` zaženite `npm start`.
2. **Zagon Backend-a**: V IDE pritisnite `Run`.
3. **Zagon Scraper-ja**: V mapi `ScraperPart` zaženite ustrezne skripte za zajem podatkov.

## SHEMA PODATKOV V BAZI
 - Nepremičnina:
![image](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/623d0547-b0f0-440e-a234-ba4af2a3d959)

 - Uporabnik:
   
 ![image](https://github.com/HlapecMihad/MojeNepremicnine/assets/117631565/ce165ed1-5366-4026-a6a8-86efb5dfc359)

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
