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

// sidebar user function
// send data by body
app.post("/api/user/register", (require, response) => {
    const user_name = require.body.user_name;
    const hashed_password = require.body.user_name;
    const sqlSelect = "SELECT * FROM User u WHERE u.User_Id = ?";
    const sqlInsert = "INSERT INTO `User` (`User_Id`, `Hashed_Password`) VALUES (?,?)";
    db.query(sqlSelect, [user_name], (err, result) => {
        if(err)
            console.log(err);
        console.log(result);
        if (result.length > 0) {
            response.send("User Exists");
        }
        else{
            db.query(sqlInsert, [user_name, hashed_password], (err, result) => {
                if(err)
                    console.log(err);
                console.log(result);
            });
            response.send("Regester Success");
        }
    });
});

app.delete("/api/user/delete", (require, response) => {
    const user_name = require.body.user_name;
    const hashed_password = require.body.user_name;
    const sqlSelect = "SELECT * FROM User u WHERE u.User_Id = ?";
    const sqlDelete = "DELETE FROM `User` WHERE u.User_Id = ?";
    db.query(sqlSelect, [user_name], (err, result) => {
        if(err)
            console.log(err);
        console.log(result);
        if (result.length == 0) {
            response.send("User not Exists");
        }
        else{
            if(hashed_password!=result[0].Hashed_Password){
                response.send("Password Incorrect");
            }
            else{
                db.query(sqlDelete, [user_name], (err, result) => {
                    if(err)
                        console.log(err);
                    console.log(result);
                });
                response.send("Delete Success");
            }
        }
    });
});

// main page
// send data by header
app.get("/api/mainpage/get", (req, response) => {
    const user_name = req.headers.user_name;
    const latitude = req.headers.lat;
    const longitude = req.headers.lon;
    const radius = req.headers.radius;
    const callProcedure = 'CALL GetCrimeInfo(?, ?, ?, ?, @output_query_id)';
    const sqlSelect =
    db.query(callProcedure, [user_name, latitude, longitude, radius], (err, result) => {
        if (err)
            console.log(err);
        console.log(result);
        db.query('SELECT * FROM `Query` WHERE Query_ID=@output_query_id', (err, result1) => {
            if (err)
                console.log(err);
            console.log(result1);
            response.send(result1);
        });
    });
});

// Victims by Areas
app.get("/api/area_victims_cnt/get", (require, response) => {
    const sqlSelect = "SELECT a.Area_Name AS Area, COUNT(v.DR_NO) AS Victim_Count FROM Victims v JOIN Areas a ON a.AREA=v.AREA GROUP BY a.Area_Name";
    console.log("/api/area_victims_cnt/get");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        response.send(result);
        if(err)
            console.log(err);
    });
});

// Victims by Weapons
app.get("/api/weapon_victims_cnt/get", (require, response) => {
    const sqlSelect = "SELECT w.Weapon_Desc AS Weapon_Desc, COUNT(v.DR_NO) AS Victim_Count FROM Victims v JOIN Weapons w ON v.Weapon_Used_Cd=w.Weapon_Used_Cd GROUP BY Weapon_Desc";
    console.log("/api/area_victims_cnt/get");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        response.send(result);
        if(err)
            console.log(err);
    });
});

// Query table
app.get("/api/queryhistory/get", (require, response) => {
    const sqlSelect = "SELECT * FROM `Query`";
    console.log("/api/queryhistory/get");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        response.send(result);
        if(err)
            console.log(err);
    });
});

// Crime record CRUD page
app.get("/api/crimedata/get", (require, response) => {
    const sqlSelect = "SELECT * FROM `Victims`";
    console.log("/api/crimedata/get");
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        response.send(result);
        if(err)
            console.log(err);
    });
});

app.post("/api/crimedata/insert", (require, response) => {
    const DR_NO = require.body.DR_NO;
    const Vict_Age = require.body.Vict_Age;
    const Vict_Sex =  require.body.Vict_Sex;
    const Weapon_Used_Cd = require.body.Weapon_Used_Cd;
    const Crm_Cd =  require.body.Crm_Cd;
    const AREA =  require.body.AREA;
    const LAT =  require.body.LAT;
    const LON =  require.body.LON;

    console.log("insert");

    const sqlInsert = 'INSERT INTO `Victims` (`DR_NO`, `Vict_Age`, `Vict_Sex`, `Weapon_Used_Cd`, `Crm_Cd`, `AREA`, `LAT`, `LON`) VALUES (?,?,?,?,?,?,?,?)';
    db.query(sqlInsert, [DR_NO, Vict_Age, Vict_Sex, Weapon_Used_Cd, Crm_Cd, AREA, LAT, LON], (err,result) => {
        console.log(err);
    })
});

app.put("/api/crimedata/update", (require, response) => {
    const DR_NO = require.body.DR_NO;
    const Vict_Age = require.body.Vict_Age;
    const Vict_Sex =  require.body.Vict_Sex;
    const Weapon_Used_Cd = require.body.Weapon_Used_Cd;
    const Crm_Cd =  require.body.Crm_Cd;
    const AREA =  require.body.AREA;
    const LAT =  require.body.LAT;
    const LON =  require.body.LON;

    console.log("update");

    const updateQuery = "UPDATE `Victims` SET Vict_Age = ?, Vict_Sex = ?, Weapon_Used_Cd = ?, Crm_Cd = ?, AREA = ?, LAT = ?, LON = ? WHERE DR_NO = ?";
    db.query(updateQuery, [Vict_Age, Vict_Sex, Weapon_Used_Cd, Crm_Cd, AREA, LAT, LON, DR_NO], (err,result) => {
        if(err)
        console.log(err);
    })
});

app.delete("/api/crimedata/delete/:DR_NO", (require, response) => {
    const DR_NO = require.params.DR_NO;
    console.log("delete");
    const sqlDelete = "DELETE FROM Victims WHERE DR_NO=?;";
    // console.log(DR_NO);
    db.query(sqlDelete, DR_NO, (err, result) => {
        if(err)
        console.log(err);
    })
}); 


app.listen(3002, '0.0.0.0', () => {
 console.log("running on port 3002");
})