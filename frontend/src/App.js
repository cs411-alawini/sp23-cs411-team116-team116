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

  const backendAddress = "http://localhost:3002"
  


  // page status, 0 = MainPage, 1 = Victims by Areas, 2 = Victims by Weapons, 3 = Query History, 4 = Crime Data
  const [pageStatus, setPageStatus] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  const [queryHistoryList, setQueryHistoryList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    user_name: 'NULL',
    password: ''
  });
  const handleMenuItemClick = (newPageStatus) => {
    setPageStatus(newPageStatus);
  };
  useEffect(() => {
    console.log('queryHistoryList updated:', queryHistoryList);
  }, [queryHistoryList]);

  const handleShowQueryHistory = async() => {
    const queryHistoryUrl = backendAddress + '/api/queryhistory/get';
    const hashedpassword = await hashPassword(userInfo.password);
    Axios.post(queryHistoryUrl, {
          user_name: userInfo.user_name,
          hashed_password: hashedpassword
        })
        .then(function(response) {
          console.log("response.data", response.data.content); // Handle the response data
          setUserMessage(response.message);
          setQueryHistoryList(response.data.content);
          setPageStatus(3);
        })
        .catch(function(error) {
            console.error(error); // Handle the error
        });
  }

  const handleRegister = async() => {
    const regHistoryUrl = backendAddress + '/api/user/register';
    const hashedpassword = await hashPassword(userInfo.password);
    Axios.post(regHistoryUrl, {
            user_name: userInfo.user_name,
            hashed_password: hashedpassword
        })
        .then(function(response) {
            console.log(response.data); // Handle the response data
            setUserMessage(response.message);
        })
        .catch(function(error) {
            console.error(error); // Handle the error
        });
  }
  const handleDeleteUser = async() => {
    const regHistoryUrl = backendAddress + '/api/user/delete';
    const hashedpassword = await hashPassword(userInfo.password);
    Axios.post(regHistoryUrl, {
            user_name: userInfo.user_name,
            hashed_password: hashedpassword
        })
        .then(function(response) {
            console.log(response.data); // Handle the response data
            setUserMessage(response.message);
        })
        .catch(function(error) {
            console.error(error); // Handle the error
        });
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
    Page = <QueryHistory backendAddress= {backendAddress} userInfo={userInfo} queryHistoryList={queryHistoryList}/>
  }
  else if(pageStatus===4){
    Page = <CrimeData backendAddress= {backendAddress}/>
  }
  return (
    <div className="App">
    <div className="App-container">
      <div className="left-sidebar">
        <Menu model={items} className="App-menu"/>
        <div style={{height: '2rem'}}></div>
        <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5 mt-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="username" className="w-6rem">
              Username
            </label>
            <InputText id="username" type="text" className="h-8 w-40" onChange={(event) => setUserInfo({...userInfo, user_name: event.target.value})}/>
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="password" className="w-6rem">
              Password
            </label>
            <InputText id="password" type="password" className="h-8 w-40" onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}/>
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
