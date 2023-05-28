from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/form")
def form_handler(username: str = Form(...), password: str = Form(default=..., min_length=8)):
    print(username, password)
    return {"username":username}

