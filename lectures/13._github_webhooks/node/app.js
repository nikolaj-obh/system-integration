import express from "express";

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true}));

app.post("/githubwebhook", (req, res) => {
    res.send({});
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
