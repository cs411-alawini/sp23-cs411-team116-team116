import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
<<<<<<< HEAD
=======

// React example
// function App() {
//   const [movieName, setMovieName] = useState('');
//   const [Review, setReview] = useState('');
//   const submitReview = () => {
//     Axios.post('http://localhost:3002/api/insert', {
//       movieName: movieName,
//       movieReview: Review
//     }).then(() => {
//       alert('success insert')
//     })
//   };

//   return (
//     <div className="App">
//       <h1> CRUD APPLICATIONS</h1>
//       <div className="form">
//         <label> Movie Name:</label>
//         <input type="text" name="movieName" onChange={(e) => {
//         setMovieName(e.target.value)
//         } }/>
//         <label> Review:</label>
//         <input type="text" name="Review" onChange={(e) => {
//         setReview(e.target.value)
//         }}/>

//         <button onClick={submitReview}> Submit</button>
//       </div>
//     </div>
//   );
// }
>>>>>>> f06312dab1e2e364415fa45f39056c783b9efc2c

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
