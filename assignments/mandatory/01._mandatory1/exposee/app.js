import express from 'express';
import http from 'http';
import sqlite3 from 'sqlite3';
let sql, sqlSelect;

 
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("<-- Recieved options from integrator"); 
  const InitOptions = req.body;
  addToDB(InitOptions);
  hook(InitOptions);

  // A quick http response to the integrator to let it know that the webhook request was recieved
  res.status(200).end();
});



function hook(options) {
    const req_options = http.request(options, (res) => {
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log(`End of response`);
        });
    });

    req_options.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body, AKA the message of the webhook

    req_options.write(JSON.stringify({message: "Hello from webhook"}));
    console.log("--> Message sent to integrator");
    req_options.end();
}

function addToDB(initOptions){
  console.log("Webhook request arrived to db");
  const db = new sqlite3.Database('./webhook.db', sqlite3.OPEN_READWRITE, (err) => { 
    if(err)
      return console.log(err.message);
  });

  //-------- Create table --------//
  //db.run(`CREATE TABLE webhooksOptions (id integer primary key, hostname, port, path, method, headers)`);
  
  //-------- Insert data into table from options --------//
  sql = `INSERT INTO webhooksOptions (hostname, port, path, method, headers) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [initOptions.hostname, initOptions.port, initOptions.path, initOptions.method, initOptions.headers], 
    (err) => { if(err) return console.log(err.message);});
  
  //--------- Query the DB --------//
  sqlSelect = `SELECT * FROM webhooksOptions`;
  db.all(sqlSelect, [], (err, rows) => {
    if(err) return console.log(err.message);
    rows.forEach((row) => { 
      console.log(row); 
    });
  });

  db.close();
  return initOptions;
};

/* The options required to send a webhook from the integrator
{
  "hostname": "localhost",
  "port": 3000,
  "path": "/hook/first",
  "method":"POST",
  "headers": {
      "Content-Type":"application/json"
  }
} */
const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));