from requests_html import HTMLSession
from bs4 import BeautifulSoup
import psycopg2

# SCRAPE DATA FROM WEB
session = HTMLSession()
url_template = 'https://www.sreality.cz/en/search/for-sale/apartments?page='; 

class Advert:
    def __init__(self, title, address, images):
        self.title = title
        self.address = address
        self.images = images

all_titles = []
all_addresses = []
all_images = []

all_adverts = []

for x in range(1, 26):
    successful = False
    while not successful:           
        current_url = url_template + str(x);
        r = session.get(current_url)
        r.html.render(timeout=20);

        soup = BeautifulSoup(r.html.html, "html.parser")

        results = soup.find_all("div", class_="property")
        image_links = soup.find_all("div", class_="_2xzMRvpz7TDA2twKCXTS4R")

        for result in results:
            all_titles.append(result.find('h2').text.strip())
            all_addresses.append(result.find("span", class_="locality").text)
        
        for link in image_links:
            current_image_links = list(link.find_all('img'))
            current_images = [];

            for image_link in current_image_links:
                if image_link['src'] != '/img/camera.svg':
                    current_images.append(image_link['src']);

            all_images.append(current_images);

        print(x)

        if len(results) == 0:
            print("Unsuccessful, scraping page again")
            successful = False
        else:
            print("Successful")
            successful = True
  
for title, address, images in zip(all_titles, all_addresses, all_images):
    all_adverts.append(Advert(title, address, images))

# WRITE TO DATABASE
conn = psycopg2.connect("dbname=postgres user=postgres password=password host=localhost port=5432")
cur = conn.cursor()

for id, advert in enumerate(all_adverts):
    cur.execute("""INSERT INTO Adverts (advertid, title, address, images) VALUES (%s, %s, %s, %s);""", 
        (id, advert.title, advert.address, advert.images))

conn.commit()
cur.close()
conn.close()