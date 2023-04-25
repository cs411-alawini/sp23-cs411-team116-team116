import './WeaponVictim.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function WeaponVictim(props) {
    const [victimByWeaponList, setvictimByWeaponList] = useState([]);

    const getWeaponVictimList = () => {
        Axios.get(props.backendAddress + '/api/weapon_victims_cnt/get', { params: { _cache: Date.now() }})
        .then((response) => {
            console.log('Sending request to backend server...');
            setvictimByWeaponList(response.data);
        })
    };

    useEffect(() => {
        getWeaponVictimList();
    }, [])

    return (
    <div className="WeaponVictim">
        <h1>Victims Count by Weapon</h1>
        <div className = "card-container">
            {victimByWeaponList.map((val) => {
                if (val.Weapon_Desc !== null) {
                    return (
                      <div className="card">
                        <h2>{val.Weapon_Desc}</h2>
                        <p>Victim Count: {val.Victim_Count}</p>
                      </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    </div>
    );
}

export default WeaponVictim;