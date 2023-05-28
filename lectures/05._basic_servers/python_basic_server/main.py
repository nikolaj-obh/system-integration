from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message":"Frist FastAPI route"}

@app.get("/json")
def _():
    return {"message":"This is my json route"}

@app.get("/xml")
def _():
    return {"message":"This is my xml route"}

@app.get("/txt")
def _():
    return {"message":"This is my txt route"}

@app.get("/yaml")
def _():
    return {"message":"This is my yaml route"}

@app.get("/csv")
def _():
    return {"message":"This is my csv route"}
# uvicorn main:app --reload
# 