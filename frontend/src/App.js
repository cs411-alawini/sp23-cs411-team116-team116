import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>

      <div className = 'form'>
        <label>Status:</label>
        <input type="text" name="status" />
        <label>Status Description:</label>
        <input type="text" name="status desc" />

        <button>INSERT</button>
      </div>

    </div>
  );
}

export default App;
