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


driver = webdriver.Edge()


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

# Function to scrape all property links
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
        if(posredovanje == 'Prodamo'): posredovanje = 'Prodaja'
        elif(posredovanje == 'Oddamo'): posredovanje = 'Oddaja'
        
        tip_nepremicnine_element = container.find('div', class_='gallery-transtype').find('span')
        tip_nepremicnine = tip_nepremicnine_element.text.strip() if tip_nepremicnine_element else 'N/A'
        transformed_property_type = transform_tip_nepremicnine(tip_nepremicnine)

        lokacija_element = container.find('div', class_='gallery-title').find('a')
        lokacija = lokacija_element.text.strip() if lokacija_element else 'N/A'

        cena_element = container.find('div', class_='gallery-price').find('a', class_='proplist_price')
        cena_link = cena_element['href'].strip() if cena_element else 'N/A'
        parsed_link = urllib.parse.urljoin(base_url, cena_link)

        data = {
            'posredovanje': posredovanje,
            'link': parsed_link,
            'tip_nepremicnine': transformed_property_type,
            'lokacija': lokacija,
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
        
        cena = soup.find('a', class_='oggtm').text.strip().replace('€', '').strip() if soup.find('a', class_='oggtm') else 'N/A'
        
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

        # Scrape images
        image_url = []
        thumbnails_container = soup.find('div', class_='sp-thumbnails')
        if thumbnails_container:
            thumbnails = thumbnails_container.find_all('img', class_='sp-thumbnail')
            for img in thumbnails:
                src = img['src']
                image_url.append(src)

        return {
            'naziv': title,
            'cena': cena,
            'id_nepremicnine': id_nepremicnine,
            'st_sob': attributes.get('Skupno št. sob:', 'N/A').split()[0].replace(',', '.') if 'Skupno št. sob:' in attributes else 'N/A',
            'st_spalnic': attributes.get('Spalnice:', 'N/A').split()[0] if 'Spalnice:' in attributes else 'N/A',
            'st_kopalnic': attributes.get('Št. kopalnic', 'N/A').split()[0] if 'Št. kopalnic' in attributes else 'N/A',
            'velikost_skupaj': attributes.get('Skupaj (m²)', 'N/A').split()[0].replace(',', '.') + " m²" if 'Skupaj (m²)' in attributes else 'N/A',
            'velikost_zemljisca': attributes.get('Velikost zemljišča (m²)', 'N/A').split()[0].replace(',', '.') + " m²" if 'Velikost zemljišča (m²)' in attributes else 'N/A',
            'leto_izgradnje': attributes.get('Leto gradnje', 'N/A').split()[0] if 'Leto gradnje' in attributes else 'N/A',
            'parkirisce': attributes.get('Parkirišča', 'N/A').split()[0] if 'Parkirišča' in attributes else 'N/A',
            'st_nadstropij': dodatni_attributes.get('Št. nadstropij', 'N/A').split()[0] if 'Št. nadstropij' in dodatni_attributes else 'N/A',
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
    # Loop to scrape all pages
    while counter < 1:
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

    for property_data in all_properties:
        if 'link' in property_data: 
            property_link = property_data['link']
            individual_data = scrape_individual_page(property_link)
            property_data.update(individual_data)

    json_data = json.dumps(all_properties, indent=4, ensure_ascii=False)
    print(json_data)

    os.makedirs(json_dir, exist_ok=True)
    with open(os.path.join(json_dir, 'Re_Max.json'), 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)

finally:
    driver.quit()
