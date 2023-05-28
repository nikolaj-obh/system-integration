import fs from "fs";
import yaml from 'js-yaml';
import csv from 'csv-parser';
import xml2js from "xml2js";

// Jeg har her lavet de fleste om til JSON objekter
function csvHandler() {
    const res = [];
    fs.createReadStream("./files/me.csv")
        .pipe(csv())
        .on('data', (data) => res.push(data))
        .on('end', () => {
            console.log("CSV output: ", res[0]);
            return res[0];
        });
};
function txtHandler() {
    fs.readFile("./files/me.txt", "utf-8", (err, txt) => {
        txt = txt.split("\r\n");
        console.log("TXT output: ", txt);
    })
};

function xmlHandler() {
    fs.readFile('./files/me.xml', function (err, data) {
        const xmlData = data.toString();

        xml2js.parseString(xmlData, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const jsonData = JSON.stringify(result, null, 4);
                console.log("XML output: ", jsonData);
            }
        });
    });
};

function jsonHandler() {
    fs.readFile("./files/me.json", "utf-8", (err, json) => {
        json = JSON.parse(json);
        console.log("JSON output: ", json);
    });
};

function yamlHandler() {
    const data = yaml.load(fs.readFileSync('./files/me.yaml', 'utf8'));
    console.log("YAML output: ", data);
    return data
};

// Handlers
csvHandler();
txtHandler();
xmlHandler();
jsonHandler();
yamlHandler();

