const puppeteer = require('puppeteer');
import {Browser} from 'puppeteer';

const url_template = 'https://www.sreality.cz/en/search/for-sale/apartments?page=';

interface Advert {
    title: string,
    address: string,
    price: string,
    images: string[]
}

const keys = {
    pgUser: 'postgres',
    pgHost: 'localhost',
    pgDatabase: 'postgres',
    pgPassword: 'password',
    pgPort: 5432,
};

const {Pool} = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort
});

export const scrape = async () => {

    const browser: Browser = await puppeteer.launch({headless: "true"});

    console.log("BROWSER LAUNCHED");
    const page = await browser.newPage();    
    let all_adverts: Advert[] = [];

    for(let i = 1; i<26; i++)
    {
        console.log("scraping page "+i)
        page.goto(url_template+i);
        await page.waitForNavigation();
        await new Promise(f => setTimeout(f, 1000));

        const adverts = await page.evaluate(() => {
            const titleElements = Array.from(document.querySelectorAll('span.name.ng-binding'));
            const titles = titleElements.map((element: any) => (element.innerText));

            const addressElements = Array.from(document.querySelectorAll('span.locality.ng-binding'));
            const addresses = addressElements.map((element: any) => (element.innerText));

            const priceElements = Array.from(document.querySelectorAll('span.norm-price.ng-binding'));
            const prices = priceElements.map((element: any) => (element.innerText));

            const imageElements = Array.from(document.querySelectorAll('div._2xzMRvpz7TDA2twKCXTS4R'));
            const imageObjects = imageElements.map((element: any) => Array.from(element.querySelectorAll('a._2vc3VMce92XEJFrv8_jaeN')));
            const images = imageObjects.map((element: any) => element.map(image => image.querySelector('img').src));

            let adverts: Advert[] = [];

            for (let i = 0; i < titles.length; i++)
            {
                adverts.push({
                    title: titles[i],
                    address: addresses[i],
                    price: prices[i],
                    images: images[i]
                })
            }

            return adverts;
        });
        all_adverts = all_adverts.concat(adverts);
    }
    await browser.close();
    
    await pgClient.query("CREATE TABLE IF NOT EXISTS Adverts(advertid INT, title VARCHAR(255), address VARCHAR(255), price VARCHAR(255), images VARCHAR)")
    .catch(err => console.log(err));

    for (let i=0; i<all_adverts.length; i++)
    {
        insertAdvert(all_adverts[i], i);
    }
    console.log("DATABASE FILLED");
}

const insertAdvert = (advert, id) => {
    try {
        pgClient.query("INSERT INTO ADVERTS (advertid, title, address, price, images) VALUES ($1, $2, $3, $4, $5)", [id, advert.title, advert.address, advert.price, advert.images]);
    } catch(e) {
        console.log(e);
    }
}

scrape();