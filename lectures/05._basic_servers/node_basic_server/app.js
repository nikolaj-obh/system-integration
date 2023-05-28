import express from "express";
import fs from "fs";
import csv from "csv-parser";
import xml2js from "xml2js";
import yaml from "js-yaml";

//initialization
const app = express();

//Getters 
app.get("/", (req, res) =>{
    res.send({message: "frontpage"});
});

app.get("/csv", (req,res) =>{
    const resp = [];
    fs.createReadStream("./files/me.csv").pipe(csv()).on('data', (data) => resp.push(data)).on('end', () => {
        const rest = resp[0];
        res.send(rest);
    });
})
app.get("/txt", (req,res) =>{
    fs.readFile("./files/me.txt", "utf-8", (err,txt)=> {
        txt = txt.split("\r\n");
        res.send(txt);
    })
})
app.get("/json", (req,res) =>{
    fs.readFile("./files/me.json","utf-8",(err,json) =>{
        json = JSON.parse(json);
        res.send(json);
    });
})
app.get("/yaml", (req,res) =>{
    const data = yaml.load(fs.readFileSync('./files/me.yaml', 'utf8'));
    res.send(data);
})
app.get("/xml", (req,res) =>{
    let parser = new xml2js.Parser();
    fs.readFile('./files/me.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        res.send(result);
        });
    }); 
})

app.listen(8080, () => console.log("Server is running on port ", 8080));