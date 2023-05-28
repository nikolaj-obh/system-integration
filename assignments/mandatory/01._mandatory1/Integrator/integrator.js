import express from 'express';

const app = express();
app.use(express.json());

// A reciever for webhook "first"
app.post("/hook/first", (req, res) => {
    console.log(`Recieved this message from webhook "first":`, req.body) 
    res.status(200).end() 
})

// A reciever for webhook "second"
app.post("/hook/second", (req, res) => {
    console.log(`Recieved this message from webhook "second":`, req.body) 
    res.status(200).end();
})

// A reciever for webhook "third"
app.post("/hook/third", (req, res) => {
    console.log(`Recieved this message from webhook "third":`, req.body) 
    res.status(200).end();
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 