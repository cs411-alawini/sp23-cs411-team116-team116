import './MainPage.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
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

    const getSearchData = (latitude, longitude, radius) => {
        setLoading(true)
        console.log('props.userInfo.user_name in getSearchData:', props.userInfo.user_name);
        const queryUrl = props.backendAddress + '/api/mainpage/get';
        Axios.get(queryUrl, {
            params: {
                mp_user_name: props.userInfo.user_name,
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
                setQuery({
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
                setLoading(false)
            });
    }

    const handleSearch = () => {
      const latitude = document.getElementById('latitude').value;
      const longitude = document.getElementById('longitude').value;
      const radius = document.getElementById('radius').value;
    
      if (!latitude || !longitude || !radius) {
        alert('Please fill in all required fields: Latitude, Longitude, and Radius');
        return;
      }
      // console.log('props.userInfo.user_name:', props.userInfo.user_name);
      getSearchData(latitude, longitude, radius);
    };

    useEffect(() => {
    // This will run every time the `query` state changes
    // console.log(query.LAT)
    console.log('Query updated:', query);
  }, [query]);

  
  const crimeLevelColor = {
    GREEN: '#28a745',
    YELLOW: '#ffc107',
    RED: '#dc3545',
  };
  
  
  const searchResults = (
    <div className="card-container">
      <Card className="p-m-2">
        <h5>Query ID: {query.Query_ID}</h5>
        <h5>User: {query.User}</h5>
      </Card>
      <Card className="p-m-2">
        <h5>Location: {query.LAT ? `${query.LAT}, ${query.LON}` : 'None'}</h5>
        <h5>Radius: {query.Radius}</h5>
      </Card>
      <Card className="p-m-2">
        <h5>Weapon 1: {query.Weapon1}</h5>
        <h5>Weapon 2: {query.Weapon2}</h5>
        <h5>Weapon 3: {query.Weapon3}</h5>
      </Card>
      <Card className="p-m-2">
        <h5>Crime Type 1: {query.Crime_Type1}</h5>
        <h5>Crime Type 2: {query.Crime_Type2}</h5>
        <h5>Crime Type 3: {query.Crime_Type3}</h5>
      </Card>
      <Card
        className="p-m-2 crime-level-card"
        style={{
          backgroundColor: crimeLevelColor[query.Crime_Level],
          // color: '#ffffff',
        }}
      >
        <h5>Crime Count: {query.Crime_Count}</h5>
        <h5>Crime Level: {query.Crime_Level}</h5>
      </Card>
    </div>
  );
  


  const loadingMessage = <div>Loading...</div>;

  return (
    <div className="SearchVictim">
      <div className="title">Search Victims by Location</div>
      <Fieldset legend="Search Parameters">
        <div className="flex flex-wrap justify-content-center align-items-center gap-2 horizontal-inputs">
          <InputText id="latitude" name="latitude" placeholder="Enter Latitude" />
          <InputText id="longitude" name="longitude" placeholder="Enter Longitude" />
          <InputText id="radius" name="radius" placeholder="Enter Radius" />
          <button onClick={handleSearch}>Search</button>
        </div>
      </Fieldset>
      <br/>
      <div className="SearchResults">{loading ? loadingMessage : searchResults}</div>
    </div>
  );
};

export default MainPage;