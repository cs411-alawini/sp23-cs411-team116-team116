import './CrimeData.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
        
function CrimeData(props) {
  const [drNo, setDrNo] = React.useState(0);
  const [victAge, setVictAge] = React.useState(0);
  const [victSex, setVictSex] = React.useState('');
  const [weaponUsedCd, setWeaponUsedCd] = React.useState(0);
  const [crmCode, setcrmCod] = React.useState(0);
  // const [weaponDesc, setWeaponDesc] = React.useState('');
  const [area, setArea] = React.useState(0);
  // const [areaName, setAreaName] = React.useState('');
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);
  const [crimeList, setCrimeList] = React.useState([]);

  const refreshList = () => {
    console.log("start refresh")
    setTimeout(() => {
      Axios.get(props.backendAddress + '/api/crimedata/get').then((response) => {
        // console.log(response.data);
        setCrimeList(response.data)
      });
    }, 500);
    console.log("finish refresh")
  };

  useEffect(() => {
    refreshList();
  }, []);
  
  const insertCrime = () => {
    Axios.post(props.backendAddress + '/api/crimedata/insert', {
      DR_NO: drNo,
      Vict_Age: victAge,
      Vict_Sex: victSex,
      Weapon_Used_Cd: weaponUsedCd,
      Crm_Cd: crmCode,
      AREA: area,
      LAT: lat,
      LON: lon
    }).then(() => {
      alert('success insert')
    })
    refreshList();
    
  };

  const deleteCrime = (DR_NO) => {
    const baseUrl = props.backendAddress + '/api/crimedata/delete/'
    Axios.delete(`${baseUrl}${DR_NO}`).then(() => {
      alert('success delete')
    });
    refreshList();
  }

  const updateCrime = (DR_NO) => {
    Axios.put(props.backendAddress + '/api/crimedata/update', {
      DR_NO: DR_NO,
      Vict_Age: victAge,
      Crm_Cd: crmCode,
      Vict_Sex: victSex,
      Weapon_Used_Cd: weaponUsedCd,
      AREA: area,
      LAT: lat,
      LON: lon
    }).then(() => {
      alert('success update')
    });
    refreshList();
  }


  return (
    <div className="CrimeData">
    <h1>Crime Data</h1>
    <div className="form">
      <Fieldset legend="Insert Crime Data">
        <div className="input-grid">
          <div className="p-field">
            <label htmlFor="DR_NO">DR_NO:</label>
            <InputText
              id="DR_NO"
              name="DR_NO"
              onChange={(e) => {
                setDrNo(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Status_Desc">Victim Age:</label>
            <InputText
              id="Status_Desc"
              name="Status_Desc"
              onChange={(e) => {
                setVictAge(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Vict_Sex">Victim Sex:</label>
            <InputText
              id="Vict_Sex"
              name="Vict_Sex"
              onChange={(e) => {
                setVictSex(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Weapon_Used_Cd">Weapon Used Code:</label>
            <InputText
              id="Weapon_Used_Cd"
              name="Weapon_Used_Cd"
              onChange={(e) => {
                setWeaponUsedCd(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Crm_Cd">Crime Code:</label>
            <InputText
              id="Crm_Cd"
              name="Crm_Cd"
              onChange={(e) => {
                setcrmCod(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Area">Area:</label>
            <InputText
              id="Area"
              name="Area"
              onChange={(e) => {
                setArea(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Latitude">Latitude:</label>
            <InputText
              id="Latitude"
              name="Latitude"
              onChange={(e) => {
                setLat(e.target.value);
              }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Longitude">Longitude:</label>
            <InputText
              id="Longitude"
              name="Longitude"
              onChange={(e) => {
                setLon(e.target.value);
              }}
            />
          </div>
        </div>
        <div style={{ height: "0.5rem" }}></div>
        <button onClick={insertCrime}>INSERT</button>
        <br />
      </Fieldset>
    </div>
    <DataTable
      value={crimeList}
      scrollable
      scrollHeight="400px"
      style={{ minWidth: "50rem" }}
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      rows={10}
      rowsPerPageOptions={[10, 20, 50]}
    >
      <Column field="DR_NO" header="DR NO"></Column>
      <Column field="Vict_Age" header="Victim Age"></Column>
      <Column field="Vict_Sex" header="Victim Sex"></Column>
      <Column field="Weapon_Used_Cd" header="Weapon Code"></Column>
      <Column field="Crm_Cd" header="Crime Code"></Column>
      <Column field="AREA" header="Area"></Column>
      <Column field="LAT" header="Latitude"></Column>
      <Column field="LON" header="Longtitude"></Column>
      <Column
        header="Actions"
        body={(rowData) => (
          <>
            <button onClick={() => deleteCrime(rowData.DR_NO)}>DELETE</button>
            <div style={{ height: "0.5rem" }}></div>
            <button onClick={() => updateCrime(rowData.DR_NO)}>UPDATE</button>
          </>
        )}
      ></Column>
    </DataTable>
  </div>
  );
}

export default CrimeData;
