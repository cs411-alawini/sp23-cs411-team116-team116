import './MainPage.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { InputText } from 'primereact/inputtext';
// import "primereact/resources/themes/lara-light-indigo/theme.css";  
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';           


      
function MainPage(props) {
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
        const queryUrl = props.backendAddress + '/api/mainpage/get';
        Axios.get(queryUrl, {
            headers: {
                user_id: userId,
                lat: latitude,
                lon: longitude, 
                radius: radius
            }
            })
            .then(function(response) {
                console.log(response.data); // Handle the response data
                const [wp1, wp2, wp3] = response.data.Most_Common_Weapon_Type ? response.data.Most_Common_Weapon_Type.split(';') : ['', '', ''];
                const [ct1, ct2, ct3] = response.data.Most_Common_Crime_Type ? response.data.Most_Common_Crime_Type.split(';') : ['', '', ''];

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

    const handleSearch = () => {
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        const radius = document.getElementById('radius').value;
        getSearchData(props.userInfo.user_name, latitude, longitude, radius);
    }

    // access example of query
    // const tmp = query.Weapon1
    return (
        <div className="SearchVictim">
          <div className="title">Search Victims by Location</div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2 horizontal-inputs">
            <InputText id="latitude" name="latitude" placeholder='Enter Latitude'/>
            <InputText id="longitude" name="longitude" placeholder='Enter Longitude'/>
            <InputText id="radius" name="radius" placeholder='Enter Radius'/>
            <button onClick={handleSearch}>Search</button>
          </div>
    
          <div className="SearchResults">
            <table>
              <thead>
                <tr>
                  <th>Victim ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Location</th>
                  <th>Crime Type</th>
                  <th>Crime Date</th>
                  <th>Crime Level</th>
                </tr>
              </thead>
              <tbody>
              <tr key={query.id}>
                <td>{query.Radius}</td>
                <td>{query.name}</td>
                <td>{query.age}</td>
                <td>{query.gender}</td>
                <td>({}, {query.LON})</td>
                <td>{query.crimeType}</td>
                <td>{query.crimeDate}</td>
                <td>{query.crimeLevel}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;