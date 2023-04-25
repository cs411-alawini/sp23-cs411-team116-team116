import './App.css';
import { hashPassword } from './components/cryptoUtils';
import AreaVictim from './AreaVictim/AreaVictim.js'
import CrimeData from './CrimeData/CrimeData.js'
import WeaponVictim from './WeaponVictim/WeaponVictim.js'
import MainPage from './MainPage/MainPage.js'
import QueryHistory from './QueryHistory/QueryHistory.js'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// import "primereact/resources/themes/lara-light-indigo/theme.css";  
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';                                        
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function App() {
  // const backendAddress = "http://localhost:3002"
  const backendAddress = "https://premdhoot-friendly-space-garbanzo-wvj764v7r65hxgw-3002.preview.app.github.dev"

  // page status, 0 = MainPage, 1 = Victims by Areas, 2 = Victims by Weapons, 3 = Query History, 4 = Crime Data
  const [pageStatus, setPageStatus] = useState(0);
  const [userMessage, setuserMessage] = useState('');
  const [queryHistoryList, setQueryHistoryList] = useState([]);
  const [userInfo, setuserInfo] = useState({
    user_name: 'NULL',
    password: ''
  });
  const handleMenuItemClick = (newPageStatus) => {
    setPageStatus(newPageStatus);
  };

  const handleShowQueryHistory = async() => {
    setPageStatus(3);
    const queryHistoryUrl = backendAddress + '/api/queryhistory/get';
    const hashedpassword = await hashPassword(userInfo.password);
    Axios.get(queryHistoryUrl, {
        params: {
            user_id: userInfo.user_name,
            hashedpassword: hashedpassword
        }
        })
        .then(function(response) {
            console.log(response.data); // Handle the response data
            setQueryHistoryList(response.data);
        })
        .catch(function(error) {
            console.error(error); // Handle the error
        });
  }

  const handleRegister = () => {

  }
  const handleDeleteUser = () => {

  }
  const items = [
    {label: 'Search Crime in your location', 
      icon: 'pi pi-fw pi-search', 
      command: () => handleMenuItemClick(0),
      className: pageStatus === 0 ? 'active-menu-item' : ''},
    {label: 'Victims count by area', 
      icon: 'pi pi-fw pi-chart-bar', 
      command: () => handleMenuItemClick(1),
      className: pageStatus === 1 ? 'active-menu-item' : '',},
    {label: 'Victims count by weapon', 
      icon: 'pi pi-fw pi-crosshairs', 
      command: () => handleMenuItemClick(2),
      className: pageStatus === 2 ? 'active-menu-item' : '',},
    {label: 'Query History', 
      icon: 'pi pi-fw pi-clock', 
      command: () => handleMenuItemClick(3),
      className: pageStatus === 3 ? 'active-menu-item' : '',},
    {label: 'Crime data', 
      icon: 'pi pi-fw pi-table', 
      command: () => handleMenuItemClick(4),
      className: pageStatus === 4 ? 'active-menu-item' : '',}
  ];

  let Page; 
  if(pageStatus===0){
    Page = <MainPage backendAddress= {backendAddress} userInfo={userInfo}/>
  }
  else if(pageStatus===1){
    Page = <AreaVictim backendAddress= {backendAddress}/>
  }
  else if(pageStatus===2){
    Page = <WeaponVictim backendAddress= {backendAddress}/>
  }
  else if(pageStatus===3){
    Page = <QueryHistory backendAddress= {backendAddress} userInfo={userInfo}/>
  }
  else if(pageStatus===4){
    Page = <CrimeData backendAddress= {backendAddress}/>
  }
  return (
    <div className="App">
    <div className="App-container">
      <div className="left-sidebar">
        <h1>Crimes Map</h1>
        <Menu model={items} className="App-menu"/>
        <div style={{height: '2rem'}}></div>
        <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5 mt-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="username" className="w-6rem">
              Username
            </label>
            <InputText id="username" type="text" className="h-8 w-40" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="password" className="w-6rem">
              Password
            </label>
            <InputText id="password" type="password" className="h-8 w-40" />
          </div>
          <div style={{height: '1rem'}}></div>
          <div className="flex flex-column justify-content-center align-items-center gap-3 mt-3">
              <Button label="Show Query History" icon="pi pi-user" className="w-8rem mx-2" onClick={handleShowQueryHistory}></Button>
              <div style={{height: '0.5rem'}}></div>
              <Button label="Register" icon="pi pi-user-plus" className="w-8rem mx-2" onClick={handleRegister}></Button>
              <div style={{height: '0.5rem'}}></div>
              <Button label="Delete User" icon="pi pi-trash" className="w-8rem mx-auto" onClick={handleDeleteUser}></Button>
          </div>
        </div>
        <div style={{height: '1rem'}}></div>
        <div>
          <div>{userMessage}</div>
        </div>
      </div>
      <div className="main-content App-page">{Page}</div>
    </div>
    </div>
  );
  
}

export default App;
