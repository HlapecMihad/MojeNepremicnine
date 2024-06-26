import requests
from bs4 import BeautifulSoup
import json
import os


korenski_url = "https://c21.si/"
korenski_url_podrobno = "https://c21.si/nepremicnine/prodaja.html?&page="


stran = 1
nepremicnine = []

base_dir = os.path.dirname(os.path.abspath(__file__))
json_dir = os.path.join(base_dir, '..', 'JSON')

#### PRIDOBIVANJE LINKOV
#### Funkcija pridobi linke do podrobne strani od vsake nepremicnine 
def pridobi_link_podstrani(url):
    response = requests.get(url)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.text, "html.parser")
    listings = soup.find_all("div", class_="flex item")

    if not listings:
        print("Ni najdene nepremičnine.")
        return None

    links = []
    for item in listings:
        podrobno_link = item.select_one("h3 a")["href"]
        links.append(korenski_url + podrobno_link)

    return links


#### PRIDOBIVANJE LASTNOSTI
#### Funkcija pridobi vse lastnosti na podrobni strani nepremicnine
def pridobi_podrobnosti_strani(url):

    response = requests.get(url)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    ##### Scrap elements 
    ##### naziv
    naziv_element = soup.select_one("h1")
    naziv = naziv_element.get_text(strip=True) if naziv_element else "N/A"

    ##### cena
    cena_element = soup.select_one(".value")
    cena = float(cena_element.get_text(strip=True).rstrip("€").replace(".",'').replace(',','.').replace('€\n              /\n              m2','')) if cena_element else None

        
    #### Tip nepremicnine    
    tip_nepremicnine = soup.select_one(".info_list").find_next("li").get_text(strip=True)
    if(tip_nepremicnine == "Parcela"): 
        tip_nepremicnine = 'Zemljišče'


    ##### image_urls
    image_elements = soup.select('.gallery a')
    image_urls = [korenski_url + img['href'] for img in image_elements if 'href' in img.attrs]

    ##### st_sob
    st_sob_element = soup.select_one(".ico_8")
    st_sob = (
        float(st_sob_element.find_next("strong").get_text(strip=True))
        if st_sob_element
        else None
    )

    ##### st_spalnic
    st_spalnic_element = soup.select_one(".ico_9")
    st_spalnic = (
        float(st_spalnic_element.find_next("strong").get_text(strip=True)) 
        if st_spalnic_element
        else None
    )

    ##### st_kopalnic
    st_kopalnic_element = soup.select_one(".ico_11")
    st_kopalnic = (
        float(st_kopalnic_element.find_next("strong").get_text(strip=True))
        if st_kopalnic_element
        else None
    )

    ##### leto_izgradnje
    leto_izgradnje_element = soup.select_one(".ico_6")
    leto_izgradnje = (
        float(leto_izgradnje_element.find_next("strong").get_text(strip=True))
        if leto_izgradnje_element
        else None
    )

    ##### st_nadstropij
    st_nadstropij_element = soup.select_one(".ico_5")
    st_nadstropij_text = st_nadstropij_element.find_next("strong").get_text(strip=True) if st_nadstropij_element else None

    if st_nadstropij_text and st_nadstropij_text.isdigit():
        st_nadstropij = float(st_nadstropij_text)
    else:
        st_nadstropij = None

    ##### velikost_zemljisca
    velikost_zemljisca = float(soup.select_one('.ico_4').find_next('strong').get_text(strip=True).replace(' m2','').replace('.','').replace(',','.')) if soup.select_one('.ico_4') else None

    ##### velikost_skupaj
    velikost_skupaj = float(soup.select_one('.ico_3').find_next('strong').get_text(strip=True).replace(' m2','').replace('.','').replace(',','.')) if soup.select_one('.ico_3') else None

    ##### id_nepremicnine
    id_nepremicnine_element = soup.select_one(".estate_id")
    id_nepremicnine = (
        id_nepremicnine_element.get_text(strip=True).replace("ID: ", "")
        if id_nepremicnine_element
        else "N/A"
    )

    ##### leto_obnove
    leto_obnove_element = soup.select_one(".ico_7")
    leto_obnove = (
        leto_obnove_element.find_next("strong").get_text(strip=True)
        if leto_obnove_element
        else "N/A"
    )

    ##### lastnosti
    lastnosti = [li.get_text(strip=True) for li in soup.select(".properties .list li")]


    return {
        "naziv": naziv,
        "posredovanje": "Prodaja",  
        "link": url,
        "tip_nepremicnine": tip_nepremicnine,
        "lokacija": naziv.strip() if naziv_element else "N/A",
        "cena": cena,
        "st_sob": st_sob,
        "st_spalnic": st_spalnic,
        "st_kopalnic": st_kopalnic,
        "leto_izgradnje": leto_izgradnje,
        "st_nadstropij": st_nadstropij,
        "velikost_zemljisca": velikost_zemljisca,
        "velikost_skupaj": velikost_skupaj,
        "id_nepremicnine": id_nepremicnine,
        "image_urls": image_urls,
        "opis": " ".join(
            [p.get_text(strip=True) for p in soup.select(".main_description .text p")]
        )
        if soup.select(".main_description .text p")
        else "N/A",
        "leto_obnove": leto_obnove,
        "agencija": "21Century",
        "lastnosti": lastnosti,
    }


#### ZANKA
#### Pojdi skozi vse strani, dokler ni več najdenih nepremicnin  /// while True  ali   while counter < 1
counter = 0
while True:
    url = f"{korenski_url_podrobno}{stran}"
    print(f"Pridobivam linke iz strani {stran}... ROK")
    detail_links = pridobi_link_podstrani(url)

    if not detail_links:
        break

    for detail_url in detail_links:
        print(f"Pridobivam podatke o nepremicnini na linku {detail_url}... ROK")
        property_data = pridobi_podrobnosti_strani(detail_url)
        if property_data:
            nepremicnine.append(property_data)

    stran += 1
    counter += 1

# Shrani v json datoteko
os.makedirs(json_dir, exist_ok=True)
with open(os.path.join(json_dir, '21C.json'), "w", encoding="UTF-8") as f:
    json.dump(nepremicnine, f, ensure_ascii=False, indent=4)