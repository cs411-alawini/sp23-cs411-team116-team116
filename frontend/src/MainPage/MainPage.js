import './MainPage.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function MainPage(backendAddress) {
    const [query, setQuery] = useState({
        Query_ID: 0,
        User: 0,
        LAT: 34.0623,
        LON: -118.246,
        Radius: 1000.0,
        Weapon1: '',
        Weapon2: '',
        Weapon3: '',
        Crime_Type1: '',
        Crime_Type2: '',
        Crime_Type3: '',
        Crime_Count: 0,
        Crime_Level: 'GREEN',
      });

    const getSearchData = (userId, latitude, longitude, radius) => {
        const queryUrl = backendAddress + '/api/mainpage/get';
        Axios.get(queryUrl, {
            params: {
                user_id: userId,
                lat: latitude,
                lon: longitude, 
                radius: radius
            }
            })
            .then(function(response) {
                console.log(response.data); // Handle the response data
                const [wp1, wp2, wp3] = response.data.Most_Common_Weapon_Type.split(';');
                const [ct1, ct2, ct3] = response.data.Most_Common_Crime_Type.split(';');
                setQuery({
                    Query_ID: response.data.Query_ID,
                    User: response.data.User,
                    LAT: response.data.LAT,
                    LON: response.data.LON,
                    Radius: response.data.Radius,
                    Weapon1: wp1,
                    Weapon2: wp2,
                    Weapon3: wp3,
                    Crime_Type1: ct1,
                    Crime_Type2: ct2,
                    Crime_Type3: ct3,
                    Crime_Count: response.data.Crime_Count,
                    Crime_Level: response.data.Crime_Level,
                  });
            })
            .catch(function(error) {
                console.error(error); // Handle the error
            });
    }

    // access example of query
    // const tmp = query.Weapon1
    return (
    <div className="MainPage">
        <h1>Main Page</h1>
    </div>
    );
}

export default MainPage;