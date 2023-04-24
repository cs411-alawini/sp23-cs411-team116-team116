import './WeaponVictim.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function WeaponVictim(props) {
    const [victimByWeaponList, setvictimByWeaponList] = useState([]);

    const getWeaponVictimList = () => {
        Axios.get(props.backendAddress + '/api/get/list2', { params: { _cache: Date.now() }})
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
        <div className = "title">Victims Count by Weapon</div>
        <div className = "card-container">
            {victimByWeaponList.map((val) => {
            return (
                <div className = "card">
                <h1>Weapon: {val.Weapon}</h1>
                <p>Victim Count: {val.Victim_Count}</p>
                </div>
            );
            })}
        </div>
    </div>
    );
}

export default WeaponVictim;