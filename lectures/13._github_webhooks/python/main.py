from fastapi import FastAPI

app = FastAPI()

@app.post("/githubwebhook")
async def github_webhook():
    return {}