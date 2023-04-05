const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// db connection, fill in required configs
// var db = mysql.createConnection({
//  host:'localhost',
//  user: 'root',
//  password:'mypassword',
//  database:'411demo',
// })
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// CRUD example
// app.post("/api/insert", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`,`movieReview`) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//     console.log(error);
//     })
//    });

app.listen(3002, () => {
 console.log("running on port 3002");
})