import csv
import json
import yaml
import xmltodict

# Jeg har her lavet dem om til dicts

# CSV
def csvHandler():
    dic, count = {}, 0
    with open('./files/me.csv', 'r') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            if row[0]=="name":
                dic["headers"]=row
            else:
                dic["row{}".format(count)]=row
            count = count + 1
    print(dic)

# TXT
def txtHandler():
    dic, temp, count = {}, ["name","age","hobbies"],0
    with open("./files/me.txt","r") as txt_file:
        for row in txt_file:
            dic[temp[count]] = row.replace("\n","")
            count = count + 1
        print(dic)

# NODEJS
def jsonHandler():
    st = ""
    with open("./files/me.json","r") as json_file:
        for row in json_file:
            st = st + row
    jsonEnd = json.loads(st)
    print(jsonEnd)

# YAML
def yamlHandler():
    with open("./files/me.yaml","r") as yaml_file:
        print(yaml.safe_load(yaml_file))

# XML
def xmlHandler():
    with open("./files/me.xml","r") as xml_file:
        dic = xmltodict.parse(xml_file.read())
    print(dic)

# Handlers
csvHandler()
txtHandler()
jsonHandler()
yamlHandler()
xmlHandler()