import './CrimeData.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function CrimeData(props) {
  const [drNo, setDrNo] = React.useState(0);
  const [victAge, setVictAge] = React.useState(0);
  const [victSex, setVictSex] = React.useState('');
  const [weaponUsedCd, setWeaponUsedCd] = React.useState(0);
  const [crmCode, setcrmCod] = React.useState(0);
  // const [weaponDesc, setWeaponDesc] = React.useState('');
  const [area, setArea] = React.useState(0);
  // const [areaName, setAreaName] = React.useState('');
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);
  const [crimeList, setCrimeList] = React.useState([]);
  const [newCrimeCode, setNewCrimeCode] = React.useState(0);

  const refreshList = () => {
    console.log("start refresh")
    setTimeout(() => {
      Axios.get(props.backendAddress + '/api/crimedata/get').then((response) => {
        console.log(response.data);
        setCrimeList(response.data)
      });
    }, 500);
    
    console.log("finish refresh")
  };

  useEffect(() => {
    refreshList();
  });

  const ReportNewCrime = () => {
    // pass arguments to backend API here
    console.log(drNo, victAge, victSex, weaponUsedCd, crmCode, area, lat, lon);
  };
  
  

  const insertCrime = () => {
    Axios.post(props.backendAddress + '/api/crimedata/insert', {
      DR_NO: drNo,
      Vict_Age: victAge,
      Vict_Sex: victSex,
      Weapon_Used_Cd: weaponUsedCd,
      Crm_Cd: crmCode,
      AREA: area,
      LAT: lat,
      LON: lon
    }).then(() => {
      alert('success insert')
    })
    refreshList();
  };

  const deleteCrime = (DR_NO) => {
    const baseUrl = props.backendAddress + '/api/crimedata/delete/'
    Axios.delete(`${baseUrl}${DR_NO}`).then(() => {
      alert('success delete')
      
    });
    refreshList();
  }

  const updateCrime = (DR_NO) => {
    Axios.put(props.backendAddress + '/api/crimedata/update', {
      DR_NO: DR_NO,
      Vict_Age: victAge,
      Crm_Cd: newCrimeCode,
      Vict_Sex: victSex,
      Weapon_Used_Cd: weaponUsedCd,
      AREA: area,
      LAT: lat,
      LON: lon
    }).then(() => {
      alert('success update')
      setNewCrimeCode("");
    });
    refreshList();
  }


  return (
    <div className="CrimeData">
      <h1>Crime Data</h1>
      <div className = 'form'>
        <label>DR_NO:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setDrNo(e.target.value)
        }}/>
        <label>Victim Age:</label>
        <input type="text" name="Status_Desc" onChange={(e) => {
          setVictAge(e.target.value)
        }}/>
        <label>Victim Sex:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setVictSex(e.target.value)
        }}/>
        <label>Weapon Used Code:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setWeaponUsedCd(e.target.value)
        }}/>
        <label>Crime Code:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setcrmCod(e.target.value)
        }}/>
        <label>Area:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setArea(e.target.value)
        }}/>
        <label>Latitude:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setLat(e.target.value)
        }}/>
        <label>Longitude:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setLon(e.target.value)
        }}/>

        <button onClick={insertCrime}>INSERT</button>
        <br/>
        <div>{crimeList.map((val) => {
          return (
            <div className = "card">
              <p>DR NO: {val.DR_NO}</p>
              <p>Victim Age: {val.Vict_Age}</p>
              <p>Victim Sex: {val.Vict_Sex}</p>
              <p>Weapon Code: {val.Weapon_Used_Cd}</p>
              <p>Crime Code: {val.Crm_Cd}</p>
              <p>Area: {val.AREA}</p>
              <b></b>
              <button onClick={() => {deleteCrime(val.DR_NO)}}>DELETE</button>
              <input className = "updateInput" type="text" id="updateCrime" onChange={(e) => {
                setNewCrimeCode(e.target.value)
              }} />
              <button onClick={() => {
                updateCrime(val.DR_NO)
              }}>UPDATE</button>
            </div>
          );
      })}</div>

      </div>
    </div>
  );
}

export default CrimeData;
