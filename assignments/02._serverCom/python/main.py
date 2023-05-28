from fastapi import FastAPI
from datetime import datetime
import requests, csv, json, xmltodict, yaml

app = FastAPI()

#Files to be sent
@app.get("/")
def _():
    return {"message":"Welcome to Python frontpage, nothing to see here"}

@app.get("/pythonXml")
def get_xml():
    with open("../files/me.xml","r") as xml_file:
        dic = xmltodict.parse(xml_file.read())
    print("XML Python")
    return dic

@app.get("/pythonTxt")
def get_txt():
    dic, temp, count = {}, ["name","age","hobbies"],0
    with open("../files/me.txt","r") as txt_file:
        for row in txt_file:
            dic[temp[count]] = row.replace("\n","")
            count = count + 1
        print("TXT Python")
        return dic

@app.get("/pythonJson")
def get_json():
    st = ""
    with open("../files/me.json","r") as json_file:
        for row in json_file:
            st = st + row
    jsonEnd = json.loads(st)
    print("JSON Python")
    return jsonEnd

@app.get("/pythonCsv")
def get_csv():
    dic, count = {},0
    with open('../files/me.csv', 'r') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            if row[0]=="name":
                dic["headers"]=row
            else:
                dic["row{}".format(count)]=row
            count = count + 1
    print("CSV Python")
    return dic

@app.get("/pythonYaml")
def get_yaml():
    with open("../files/me.yaml","r") as yaml_file:
        print("YAML Python")
        return yaml.safe_load(yaml_file)

#Requests from nodejs

@app.get("/n2pXml")
def get_xml():
    response = requests.get("http://127.0.0.1:8080/nodeXml")
    return response.json()

@app.get("/n2pTxt")
def get_txt():
    response = requests.get("http://127.0.0.1:8080/nodeTxt")
    return response.json()

@app.get("/n2pJson")
def get_json():
    response = requests.get("http://127.0.0.1:8080/nodeJson")
    return response.json()

@app.get("/n2pCsv")
def get_csv():
    response = requests.get("http://127.0.0.1:8080/nodeCsv")
    return response.json()

@app.get("/n2pYaml")
def get_yaml():
    response = requests.get("http://127.0.0.1:8080/nodeYaml")
    return response.json()

