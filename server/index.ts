const express = require("express");
const {Pool} = require("pg");

const keys = {
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDatabase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT,
};

const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort
});

const app = express();

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