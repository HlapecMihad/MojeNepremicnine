import os
import json
import urllib.parse
from datetime import datetime
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

base_dir = os.path.dirname(os.path.abspath(__file__))
json_dir = os.path.join(base_dir, '..', 'JSON')

options = webdriver.EdgeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--remote-debugging-port=9222')

driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    options=options
)

base_url = 'https://www.re-max.si/PublicListingList.aspx'
driver.get(base_url)

try:
    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"))
    ).click()
except Exception as e:
    print("No 'Allow Cookies' button found or error clicking it:", e)


def transform_tip_nepremicnine(tip_nepremicnine: str) -> str:
    mapping = {
        'Pisarna': 'Poslovni prostor',
        'Počitniška nepremičnina': 'Počitniški objekt',
        'Zazidljivo zemljišče': 'Zemljišče',
        'Nezazidljivo zemljišče': 'Zemljišče'
    }
    return mapping.get(tip_nepremicnine, tip_nepremicnine)
 
def scrape_page() -> list:
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CLASS_NAME, "gallery-item-container"))
    )
 
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    containers = soup.find_all('div', class_='gallery-item-container')
    properties = []
 
    for container in containers:
        posredovanje_element = container.find('div', class_='card-trans-type collection-card drop-shadow')
        posredovanje = posredovanje_element.text.strip() if posredovanje_element else 'N/A'
        if posredovanje in ['Prodamo', 'For Sale']:
            posredovanje = 'Prodaja'
        elif posredovanje in ['Oddamo', 'For Rent/Lease']:
            posredovanje = 'Oddaja'
       
        tip_nepremicnine_element = container.find('div', class_='gallery-transtype').find('span')
        tip_nepremicnine = tip_nepremicnine_element.text.strip() if tip_nepremicnine_element else 'N/A'
        transformed_property_type = transform_tip_nepremicnine(tip_nepremicnine)
 
        lokacija_element = container.find('div', class_='gallery-title').find('a')
        lokacija = lokacija_element.text.strip() if lokacija_element else 'N/A'
 
        cena_element = container.find('div', class_='gallery-price').find('a', class_='proplist_price')
        cena_link = cena_element['href'].strip() if cena_element else 'N/A'
        parsed_link = urllib.parse.urljoin(base_url, cena_link) + '?Lang=sl-SI'
 
        data = {
            'posredovanje': posredovanje,
            'link': parsed_link,
        }
 
        properties.append(data)
 
    return properties
 
def scrape_individual_page(property_link: str) -> dict:
    try:
        driver.get(property_link)
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "desc-short"))
        )
        soup = BeautifulSoup(driver.page_source, 'html.parser')
       
        title = soup.find('h1', itemprop='name').text.strip() if soup.find('h1', itemprop='name') else 'N/A'
       
        cena = float(soup.find('a', class_='oggtm').text.strip().replace('€', '').strip().replace('.', '')) if soup.find('a', class_='oggtm') else None
       
        id_nepremicnine = soup.find('span', itemprop='productID').text.strip() if soup.find('span', itemprop='productID') else 'N/A'
       
        attributes = {}
        attribute_rows = soup.find_all('div', class_='data-item-row')
        for row in attribute_rows:
            label = row.find('div', class_='data-item-label').text.strip() if row.find('div', class_='data-item-label') else 'N/A'
            value = row.find('div', class_='data-item-value').text.strip() if row.find('div', class_='data-item-value') else 'N/A'
            attributes[label] = value
 
        dodatni_attributes = {}
        dodatni_attribute_rows = soup.find_all('div', class_='attributes-no-icons attributes-data-col')
        for row in dodatni_attribute_rows:
            label = row.find('div', class_='data-item-label').text.strip() if row.find('div', class_='data-item-label') else 'N/A'
            value = row.find('div', class_='data-item-value').text.strip() if row.find('div', class_='data-item-value') else 'N/A'
            dodatni_attributes[label] = value
 
        lastnosti = []
        lastnosti_container = soup.find('div', class_='features-container')
        if lastnosti_container:
            feature_items = lastnosti_container.find_all('span', class_='feature-item')
            for item in feature_items:
                feature = item.text.strip()
                lastnosti.append(feature)
 
        opis = soup.find('div', itemprop='description').text.strip() if soup.find('div', itemprop='description') else 'N/A'
 
        image_url = []
        thumbnails_container = soup.find('div', class_='sp-thumbnails')
        if thumbnails_container:
            thumbnails = thumbnails_container.find_all('img', class_='sp-thumbnail')
            for img in thumbnails:
                src = img['src']
                image_url.append(src)
 
        property_type = soup.find('div', class_="key-data").find_next('div', class_="key-title").get_text().split(' - ')[0].strip()
        lokacija = soup.find('div', class_="key-data").find_next('div', class_="key-title").get_text().split(' - ')[2].strip()
       
        premicniskitip = transform_tip_nepremicnine(property_type)
 
        return {
            'tip_nepremicnine': premicniskitip,
            'location': lokacija,
            'naziv': title,
            'cena': cena,
            'id_nepremicnine': id_nepremicnine,
            'st_sob': float(attributes.get('Skupno št. sob:', 'N/A').split()[0].replace(',', '.')) if 'Skupno št. sob:' in attributes else None,
            'st_spalnic': float(attributes.get('Spalnice:', 'N/A').split()[0]) if 'Spalnice:' in attributes else None,
            'st_kopalnic': float(attributes.get('Št. kopalnic', 'N/A').split()[0]) if 'Št. kopalnic' in attributes else None,
            'velikost_skupaj': float(attributes.get('Skupaj (m²)', 'N/A').split()[0].replace(',', '.')) if 'Skupaj (m²)' in attributes else None,
            'velikost_zemljisca': float(attributes.get('Velikost zemljišča (m²)', 'N/A').split()[0].replace(',', '.')) if 'Velikost zemljišča (m²)' in attributes else None,
            'leto_izgradnje': float(attributes.get('Leto gradnje', 'N/A').split()[0]) if 'Leto gradnje' in attributes else None,
            'st_nadstropij': float(dodatni_attributes.get('Št. nadstropij', 'N/A').split()[0]) if 'Št. nadstropij' in dodatni_attributes else None,
            'opis': opis,
            'lastnosti': lastnosti,
            'image_urls': image_url,
            'agencija': "Re-Max"
        }
    except Exception as e:
        print(f"Error scraping individual page {property_link}: {e}")
        return {}
 
all_properties = []
 
counter = 0
try:
    while counter < 25:
        properties = scrape_page()
        all_properties.extend(properties)
 
        try:
            next_button = driver.find_element(By.CSS_SELECTOR, 'a.ajax-page-link i.page-next').find_element(By.XPATH, '..')
            next_button.click()
            time.sleep(3)
        except:
            print("No more pages.")
            break
        counter += 1
 
    prodaja_properties = []
    oddaja_properties = []
 
    for property_data in all_properties:
 
        if 'link' in property_data:
            property_link = property_data['link']
            individual_data = scrape_individual_page(property_link)
            property_data.update(individual_data)
            if property_data['posredovanje'] == 'Prodaja':
                prodaja_properties.append(property_data)
            elif property_data['posredovanje'] == 'Oddaja':
                oddaja_properties.append(property_data)
 
 
    os.makedirs(json_dir, exist_ok=True)
 
    if prodaja_properties:
        json_data_prodaja = json.dumps(prodaja_properties, indent=4, ensure_ascii=False)
        with open(os.path.join(json_dir, 'Re_MaxProdaja.json'), 'w', encoding='utf-8') as json_file:
            json_file.write(json_data_prodaja)
 
    if oddaja_properties:
        json_data_oddaja = json.dumps(oddaja_properties, indent=4, ensure_ascii=False)
        with open(os.path.join(json_dir, 'Re_MaxOddaja.json'), 'w', encoding='utf-8') as json_file:
            json_file.write(json_data_oddaja)
 
finally:
    driver.quit()