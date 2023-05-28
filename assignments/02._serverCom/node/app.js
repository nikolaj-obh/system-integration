import express from "express"
import fs from "fs";
import yaml from 'js-yaml';
import csv from 'csv-parser';
import xml2js from "xml2js";

const app = express()

//Outbound
app.get("/", (req,res) =>{
    res.send({message:"Welcome to Node frontpage, nothing to see here"})
})
app.get("/nodeXml", (req, res) => {
    let parser = new xml2js.Parser();
    fs.readFile('../files/me.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            console.log("XML NODE")
            res.send(result)
        });
    });
})  

app.get("/nodeTxt", (req, res) => {
    fs.readFile("../files/me.txt", "utf-8", (err,txt)=> {
        txt = txt.split("\r\n");
        console.log("TXT NODE")
        res.send(txt)
    })
})

app.get("/nodeYaml", async (req,res) => {
    const data = yaml.load(fs.readFileSync('../files/me.yaml', 'utf8'));
    console.log("YAML NODE")
    res.send(data)
})

app.get("/nodeCsv", async (req,res) => {
    const resu = [];
    fs.createReadStream("../files/me.csv")
    .pipe(csv())
    .on('data', (data) => resu.push(data))
    .on('end', () => {
        const rest = resu[0]
        console.log("CSV NODE")
        res.send(rest)
    });
})

app.get("/nodeJson", async (req,res) => {
    fs.readFile("../files/me.json","utf-8",(err,json) =>{
        json = JSON.parse(json);
        console.log("JSON NODE")
        res.send(json);
    });
})

//request from python server
app.get("/p2nXml", async (req, res) => {
    await fetch('http://127.0.0.1:8000/pythonXml')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})

app.get("/p2nTxt", async (req, res) => {
    await fetch('http://127.0.0.1:8000/pythonTxt')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})

app.get("/p2nYaml", async (req,res) => {
    await fetch('http://127.0.0.1:8000/pythonYaml')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})

app.get("/p2nCsv", async (req,res) => {
    await fetch('http://127.0.0.1:8000/pythonCsv')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})

app.get("/p2nJson", async (req,res) => {
    await fetch('http://127.0.0.1:8000/pythonJson')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})

const PORT = 8080
app.listen(PORT, () =>console.log("Port open on: ", PORT))