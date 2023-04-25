import './CrimeData.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function CrimeData(props) {
  const [drNo, setDrNo] = React.useState(0);
  const [victAge, setVictAge] = React.useState(0);
  const [victSex, setVictSex] = React.useState('');
  const [weaponUsedCd, setWeaponUsedCd] = React.useState(0);
  const [weaponDesc, setWeaponDesc] = React.useState('');
  const [area, setArea] = React.useState(0);
  const [areaName, setAreaName] = React.useState('');
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);

  const ReportNewCrime = () => {
    // pass arguments to backend API here
    console.log(drNo, victAge, victSex, weaponUsedCd, weaponDesc, area, areaName, lat, lon);
  };

  return (
    <div className="CrimeData">
        <h1>Crime Data</h1>
    </div>
  );
}

export default CrimeData;
