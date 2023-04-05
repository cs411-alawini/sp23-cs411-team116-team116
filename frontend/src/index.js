const express = require("express");
const app = express();
const mysql = require("mysql");

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'cs411crimedata',
})

app.get('/', (require, response) => {
    const sqlInsert = "INSERT INTO 'Status' ('DR_NO', 'Status', 'Status Desc') VALUES (12345, 'hi', 'random')"
    db.query(sqlInsert, (err,result) => {
        response.send("Hello world");
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
})
