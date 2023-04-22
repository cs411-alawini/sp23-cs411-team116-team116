import './AreaVictim.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function AreaVictim(backendAddress) {
    const [victimByAreaList, setVictimByAreaList] = useState([]);

    const getAreaVictimList = () => {
    Axios.get(backendAddress + '/api/get/list1', { params: { _cache: Date.now() }})
    .then((response) => {
            console.log('Sending request to backend server...');
            setVictimByAreaList(response.data);
        })
    };

    useEffect(() => {
        getAreaVictimList();
    }, [])

    return (
    <div className="AreaVictim">
        <h1>Victims Count by Area</h1>
    </div>
    );
}

export default AreaVictim;