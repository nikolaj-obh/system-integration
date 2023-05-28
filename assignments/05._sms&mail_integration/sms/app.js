import express from 'express';
import fetch, { FormData } from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json());

const formdata = new FormData();
formdata.set("user_api_key", process.env.USER_API_KEY);
formdata.set("sms_message", "Hello from fetch excersise");
formdata.set("sms_to_phone", process.env.SMS_TO_PHONE);

const response = await fetch('https://fiotext.com/send-sms', {method: 'post', body: formdata});
const data = await response.json();

console.log(data);


app.listen(3000, () => {
    console.log("Listening on port 3000");
});

