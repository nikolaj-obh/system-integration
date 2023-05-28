import fs from "fs";
import { load } from "cheerio";
import sqlite3 from "sqlite3";

/*const response = await fetch("https://www.iban.com/exchange-rates");
const result = await response.text();

fs.writeFileSync("index.html", result);*/

const page = fs.readFileSync("index.html", "utf-8");
const $ = load(page);

let array = [];
array.push(Date.now());
//await checkCurrency();
console.log(await addToDB(array));

async function checkCurrency(){
    // Kigger først på table classer kaldet table, derefter i hver tr tag. 
    const table = $(".table");
    table.find('tr').each((index, element) => {
        if (index === 0) return;

        const row = $(element)
        // For hver tr tag, kig mere specifikt på dens td og derefter gør stuff med indhold
        const columns = row.find('td');

        // "EQ", er en måde at indexe indhold og derefter nemt tilgå det.
        const currency = columns.eq(0).text();
        const rate = columns.eq(1).text();
        const value = columns.eq(2).text();

        array.push(currency, rate, value)
    });
};

async function addToDB(currency){
    const db = await new sqlite3.Database('./currency.db', sqlite3.OPEN_READWRITE, (err) => { 
        if(err)
            return console.log(err.message);
        });
    //await db.run(`CREATE TABLE currency (current)`);
    const sql = `INSERT INTO currency VALUES (?)`;
    await db.run(sql, [currency], (error) => { if(error) return console.log(error.message);});
        
    const sqlSelect = `SELECT * FROM currency`;
    let count = 0;
    await db.all(sqlSelect, [], (err, rows) => {
        if(err) return console.log(err.message);

        rows.forEach((row) => { 
            count++;
            console.log("SELECTED ROW #%s ", count, row.current); 
        }); 
    });
    db.close();
    return "--- DB Manipulation DONE ---"
    }
