import './WeaponVictim.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function WeaponVictim(backendAddress) {
    const [victimByWeaponList, setvictimByWeaponList] = useState([]);

    const getWeaponVictimList = () => {
        Axios.get(backendAddress + '/api/get/list2', { params: { _cache: Date.now() }})
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
    </div>
    );
}

export default WeaponVictim;