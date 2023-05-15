const keys = require("./keys");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres
const {Pool} = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort
});

pgClient.on("connect", (client) => {
    client.query("CREATE TABLE IF NOT EXISTS Adverts(advertid INT, title VARCHAR(255), address VARCHAR(255), images VARCHAR)")
          .catch(err => console.log(err));
})

app.get("/", (req, res) => {
    res.send("Hi");
})

app.get("/values/all", async(req, res) => {
    try{
        const values = await pgClient.query("SELECT * FROM adverts");
        res.send(values);
    } catch(e) {
        console.log(e)
    }
});

app.listen(5000, err => {
    console.log("Listening");
});