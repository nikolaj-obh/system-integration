import xml.etree.ElementTree as ET
#import yaml
import json
import csv

tree = ET.parse("files/cars.xml")
root = tree.getroot()

xml_result = []
for car in root:
    car_dict = {}
    for element in car:
        car_dict[element.tag] = element.text
    xml_result.append(car_dict)
print()
print(xml_result)

#with open("files/cars.yml", "r") as f:
#    yml_result = yaml.safe_load(f)["cars"]
#print()
#print(yml_result)

with open("files/cars.json", "r") as f:
    json_result = json.load(f)
print()
print(json_result)

with open("files/cars.csv", "r") as f:
    reader = csv.DictReader(f)
    csv_result = [row for row in reader]
print()
print(csv_result)

#with open("cars.txt", "r") as f:
#    txt_result = []
#    car_data = ""
#    for line in f:
#        if line.strip() == "":
#            txt_result.append(car_data)
#            car_data = ""
#        else:
#            car_data += line
#    txt_result = [{
#        line.split(":")[0].strip(): line.split(":")[1].strip()
#        for line in car.split("\n")
#    } for car in txt_result if car]
#print()
#print(txt_result)
