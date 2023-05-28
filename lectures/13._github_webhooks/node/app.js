import express from "express"

const app = express()
app.use(express.json())

app.get("/", (req,res) => {
    console.log(req.body);
    res.send({})
})
app.listen(8080, () =>{
    console.log("Server is running on: ", 8080)
})