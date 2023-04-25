import './AreaVictim.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function AreaVictim(props) {
    const [victimByAreaList, setVictimByAreaList] = useState([]);

    const getAreaVictimList = () => {
    Axios.get(props.backendAddress + '/api/get/list1', { params: { _cache: Date.now() }})
    .then((response) => {
            console.log('Sending request to backend server...');
            setVictimByAreaList(response.data);
        })
    };

    useEffect(() => {
        getAreaVictimList();
    }, [])

    return (
        <div class="AreaVictim">
          <h1>Victims Count by Area</h1>
          <div class = "card-container">
            {victimByAreaList.map((val) => {
              return (
                <div class="card">
                  <h2>Area: {val.Area}</h2>
                  <p>Victim Count: {val.Victim_Count}</p>
                </div>
              );
            })}
          </div>
        </div>
      );      
}

export default AreaVictim;