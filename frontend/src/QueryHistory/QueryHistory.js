import './QueryHistory.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function QueryHistory(props) {

    return (
    <div className="QueryHistory">
        <div className=".card">
            <DataTable value={props.queryHistoryList} tableStyle={{ minWidth: '50rem' }}>
                <Column field="Query_ID" header="Query ID"></Column>
                <Column field="LAT" header="Latitude"></Column>
                <Column field="LON" header="Longtitude"></Column>
                <Column field="Radius" header="Radius"></Column>
                <Column field="Most_Common_Weapon_Type" header="Most Common Weapon Type"></Column>
                <Column field="Most_Common_Crime_Type" header="Most Common CrimeType"></Column>
                <Column field="Crime_Count" header="Crime Count"></Column>
                <Column field="Crime_Level" header="Crime Level"></Column>
            </DataTable>
        </div>
    </div>

    );
}

export default QueryHistory;