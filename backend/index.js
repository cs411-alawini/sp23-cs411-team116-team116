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
 database:'CS411CrimeData',
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
// sidebar user function
app.post("/api/user/register", (require, response) => {

});

app.delete("/api/user/delete", (require, response) => {
    
});
// main page
app.get("/api/mainpage/get", (require, response) => {

});
// app.get("/api/search/by/status/:searchInput", (require, response) => {
//     const searchInput = require.params.searchInput;
//     const sqlSelect = "SELECT * FROM Status s WHERE s.Status= ? LIMIT 1000";
//     console.log("search");
//     db.query(sqlSelect, [searchInput], (err, result) => {
//         console.log(result);
//         // console.log(newList)
//         response.send(result);
//         if(err)
//             console.log(err);
//     });
// });



// Victims by Areas
app.get("/api/area_victims_cnt/get", (require, response) => {
    const sqlSelect = "SELECT `Area Name` AS Area, COUNT(v.DR_NO) AS Victim_Count FROM Areas a JOIN Victims v ON a.DR_NO=v.DR_NO GROUP BY `Area Name`";
    console.log("get1");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        // console.log(newList)
        response.send(result);
        if(err)
            console.log(err);
    });
});

// Victims by Weapons
app.get("/api/weapon_victims_cnt/get", (require, response) => {
    const sqlSelect = "SELECT `Area Name` AS Area, COUNT(v.DR_NO) AS Victim_Count FROM Areas a JOIN Victims v ON a.DR_NO=v.DR_NO GROUP BY `Area Name`";
    console.log("get1");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        // console.log(newList)
        response.send(result);
        if(err)
            console.log(err);
    });
});

// Query table
app.get("/api/queryhistory/get", (require, response) => {

});

// Crime record CRUD page
app.post("/api/crimedata/insert", (require, response) => {
    const Status = require.body.Status;
    const Status_Desc = require.body.Status_Desc;
    const DR_NO = require.body.DR_NO;

    console.log("insert");
    console.log(require.body);

    const sqlInsert = 'INSERT INTO `Status` (`DR_NO`, `Status`, `Status Desc`) VALUES (?,?,?)';
    db.query(sqlInsert, [DR_NO, Status, Status_Desc], (err,result) => {
        console.log(err);
    })
});

app.put("/api/crimedata/update", (require, response) => {

});
// app.put("/api/update/", (require, response) => {
//     // const Status = require.body.Status;
//     const Status_Desc = require.body.Status_Desc;
//     const DR_NO = require.body.DR_NO;

//     console.log("update");
//     console.log(require.body);

//     const sqlUpdate = "UPDATE `Status` SET `Status Desc` = ? WHERE `DR_NO` = ?";
//     db.query(sqlUpdate, [Status_Desc,DR_NO], (err,result) => {
//         if(err)
//         console.log(err);
//     })
// });

app.delete("/api/crimedata/delete", (require, response) => {
}); 
// app.delete("/api/delete/:DR_NO", (require, response) => {
//     // const Status = require.params.Status;
//     const DR_NO = require.params.DR_NO;
//     console.log("delete");
//     console.log(require.params);
//     const sqlDelete = "DELETE FROM `Status` WHERE `DR_NO`=?;";
//     // console.log(DR_NO);
//     db.query(sqlDelete, DR_NO, (err, result) => {
//         if(err)
//         console.log(err);
//     })
// });


app.listen(3002, '0.0.0.0', () => {
 console.log("running on port 3002");
})