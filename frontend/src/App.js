import './App.css';
import AreaVictim from './AreaVictim/AreaVictim.js'
import CrimeData from './CrimeData/CrimeData.js'
import WeaponVictim from './WeaponVictim/WeaponVictim.js'
import MainPage from './MainPage/MainPage.js'
import QueryHistory from './QueryHistory/QueryHistory.js'
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


function App() {
  // const backendAddress = "http://localhost:3002"
  const backendAddress = "https://whhuang4-cautious-goggles-4499vqp7pwvfqr4x-3002.preview.app.github.dev"
  // page status, 0 = MainPage, 1 = Victims by Areas, 2 = Victims by Weapons, 3 = Query History, 4 = Crime Data
  const [pageStatus, setPageStatus] = useState(0);
  const handleMenuItemClick = (newPageStatus) => {
    setPageStatus(newPageStatus);
  };

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
    Page = <MainPage backendAddress= {backendAddress}/>
  }
  else if(pageStatus===1){
    Page = <AreaVictim backendAddress= {backendAddress}/>
  }
  else if(pageStatus===2){
    Page = <WeaponVictim backendAddress= {backendAddress}/>
  }
  else if(pageStatus===3){
    Page = <QueryHistory backendAddress= {backendAddress}/>
  }
  else if(pageStatus===4){
    Page = <CrimeData backendAddress= {backendAddress}/>
  }
  return (
    <div className="App">
      <div className="left-sidebar">
        <h1>Crimes Map</h1>
        <Menu model={items} />
      </div>
      <div className="main-content">{Page}</div>
    </div>
  );
  
}

export default App;
