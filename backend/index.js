const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// db connection, fill in required configs
var db = mysql.createConnection({
 host:'34.27.148.60',
 user: 'root',
 password:'1234',
 database:'cs411crime',
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully!');
});

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


// app.get('/', (require,response) => {
//     const sqlInsert = 'INSERT INTO `Status` (`DR_NO`, `Status`, `Status Desc`) VALUES (?,?,?);';
//     db.query(sqlInsert, (err,result) => {
//         response.send("Hello World");
//     })
// })

app.post("/api/insert", (require, response) => {
    const Status = require.body.Status;
    const Status_Desc = require.body.Status_Desc;
    const DR_NO = require.body.DR_NO;

    console.log(DR_NO);

    const sqlInsert = 'INSERT INTO `Status` (`DR_NO`, `Status`, `Status Desc`) VALUES (?,?,?)';
    db.query(sqlInsert, [DR_NO, Status, Status_Desc], (err,result) => {
        console.log(err);
    })
});

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Status LIMIT 1000";
    db.query(sqlSelect, (err, result) => {
        console.log(result[0]['Status Desc']);
        const newList = result.map(row=> ({
            Status: row.Status,
            Status_Desc: row['Status Desc'],
            DR_NO: row.DR_NO
        }))
        console.log(newList)
        response.send(newList);
    });
});

app.delete("/api/delete/:DR_NO", (require, response) => {
    // const Status = require.params.Status;
    const DR_NO = require.params.DR_NO;

    const sqlDelete = "DELETE FROM `Status` WHERE `DR_NO`=?;";
    console.log(DR_NO);
    db.query(sqlDelete, DR_NO, (err, result) => {
        if(err)
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    // const Status = require.body.Status;
    const Status_Desc = require.body.Status_Desc;
    const DR_NO = require.body.DR_NO;

    console.log(Status_Desc, DR_NO);

    const sqlUpdate = "UPDATE `Status` SET `Status Desc` = ? WHERE `DR_NO` = ?";
    db.query(sqlUpdate, [Status_Desc,DR_NO], (err,result) => {
        if(err)
        console.log(err);
    })
});

app.listen(3002, () => {
 console.log("running on port 3002");
})