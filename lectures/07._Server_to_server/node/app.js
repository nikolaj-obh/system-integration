import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("welcome to node env")
})

app.get("/date", (req, res) => {
    console.log("you have entered Date endpoint")
    res.send(new Date());
})

app.get("/datefromfastapi", async (req,res) => {
    await fetch('http://127.0.0.1:8000/date')
    .then((resp) => resp.json())
    .then((data) => res.send(data));
})
const PORT = 8080
app.listen(PORT, () =>console.log("Port open on: ", PORT))