import subprocess
import os
from concurrent.futures import ThreadPoolExecutor

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

if __name__ == "__main__":
    script_to_run = [
        "../Scrapers/scraper_posebej_oddaja.py",
        "../Scrapers/scraper_posebej_prodaja.py",
        "../Scrapers/Scraper1.py",
        "../Scrapers/Scrapper_21C.py"
    ]

    with ThreadPoolExecutor() as executor:
        executor.map(run_other_script, script_to_run)
