import subprocess
import os
import json
from concurrent.futures import ThreadPoolExecutor
import pymongo

def run_other_script(script_name):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    script_path = os.path.join(current_directory, script_name)

    if os.path.exists(script_path):
        try:
            subprocess.run(["python", script_path], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error occurred while running '{script_name}': {e}")
    else:
        print(f"Error: Script '{script_name}' not found in the directory.")

def combine_json_files(json_files):
    combined_data = []
    for file in json_files:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), file)
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    combined_data.extend(data if isinstance(data, list) else [data])
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON from file '{file}': {e}")
            except UnicodeDecodeError as e:
                print(f"Error reading file '{file}' due to encoding issues: {e}")
        else:
            print(f"Error: JSON file '{file}' not found.")
    return combined_data

def save_combined_json(data, output_file):
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), output_file)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Combined JSON data saved to '{output_file}'")

def send_to_mongodb(collection_name, data):
    print("Sending data to MongoDB...")
    client = pymongo.MongoClient("mongodb+srv://admin:admin@dbcluster.d2ungtz.mongodb.net/")
    db = client["nepremicnine"]
    collection = db[collection_name]
    
    # Empty the collection
    collection.delete_many({})
    
    # Insert the new data
    if isinstance(data, list):
        collection.insert_many(data)
    else:
        collection.insert_one(data)
    print("Data inserted successfully")

if __name__ == "__main__":
    script_to_run = [
        "../Scrapers/scraper_posebej_oddaja.py",
        "../Scrapers/scraper_posebej_prodaja.py",
        "../Scrapers/Scraper1.py",
        "../Scrapers/Scrapper_21C.py"
    ]

    with ThreadPoolExecutor() as executor:
        future = executor.map(run_other_script, script_to_run)
        executor.shutdown(wait=True)  
    
    json_files_prodaja = [
        "../JSON/siol_prodaja.json",
        "../JSON/21C.json",
        "../JSON/Re_MaxProdaja.json",
    ]

    json_files_oddaja = [
        "../JSON/siol_oddaja.json",
        "../JSON/Re_MaxOddaja.json",
    ]

    combined_data_prodaja = combine_json_files(json_files_prodaja)
    combined_json_file_prodaja = "../JSON/combined_dataProdaja.json"
    save_combined_json(combined_data_prodaja, combined_json_file_prodaja)
    send_to_mongodb("nepremicnine_prodaja_avtomatizacija", combined_data_prodaja)

    combined_data_oddaja = combine_json_files(json_files_oddaja)
    combined_json_file_oddaja = "../JSON/combined_dataOddaja.json"
    save_combined_json(combined_data_oddaja, combined_json_file_oddaja)
    send_to_mongodb("nepremicnine_oddaja_avtomatizacija", combined_data_oddaja)
