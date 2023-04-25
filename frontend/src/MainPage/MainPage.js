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

    const [loading, setLoading] = useState(false);

    const getSearchData = (userId, latitude, longitude, radius) => {
        setLoading(true)
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
                console.log("response.data",response.data); // Handle the response data
                const [wp1, wp2, wp3] = response.data[0].Most_Common_Weapon_Type ? response.data[0].Most_Common_Weapon_Type.split(';') : ['', '', ''];
                const [ct1, ct2, ct3] = response.data[0].Most_Common_Crime_Type ? response.data[0].Most_Common_Crime_Type.split(';') : ['', '', ''];
                console.log(response.data[0].Query_ID)
                setQuery({
                    Query_ID: response.data[0].Query_ID,
                    User: response.data[0].User,
                    LAT: response.data[0].LAT,
                    LON: response.data[0].LON,
                    Radius: response.data[0].Radius,
                    Weapon1: wp1,
                    Weapon2: wp2,
                    Weapon3: wp3,
                    Crime_Type1: ct1,
                    Crime_Type2: ct2,
                    Crime_Type3: ct3,
                    Crime_Count: response.data[0].Crime_Count,
                    Crime_Level: response.data[0].Crime_Level,
                  });
                setLoading(false)
            })
            .catch(function(error) {
                console.error(error); // Handle the error
                setLoading(false)
            });
    }

    const handleSearch = () => {
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        const radius = document.getElementById('radius').value;
        getSearchData(props.userInfo.user_name, latitude, longitude, radius);
    }

    useEffect(() => {
    // This will run every time the `query` state changes
    console.log(query.LAT)
    console.log('Query updated:', query);
  }, [query]);

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
                  <th>Location</th>
                  <th>Crime Type</th>
                  <th>Crime Level</th>
                </tr>
              </thead>
              <tbody>
                <tr key={query.Query_ID}>
                  <td>{query.Query_ID}</td>
                  <td>{query.User || 'None'}</td>
                  <td>{query.LAT ? `${query.LAT}, ${query.LON}` : 'None'}</td>
                  <td>{query.Crime_Type1 || 'None'}</td>
                  <td>{query.Crime_Level || 'None'}</td>
                </tr>
              </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;