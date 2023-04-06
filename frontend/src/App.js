import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

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

function App() {
  const [Status, setStatus] = useState('');
  const [Status_Desc, setStatusDesc] = useState('');
  const [DR_NO, setDRNO] = useState(0);
  const [statusList, setStatusList] = useState([]);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setStatusList(response.data)
    })
  }, [])

  const insertStatus = () => {
    Axios.post('http://localhost:3002/api/insert', {
      Status: Status,
      Status_Desc: Status_Desc,
      DR_NO: DR_NO
    }).then(() => {
      alert('success insert')
    })

    setStatusList([
      statusList,
      {
        Status: Status,
        Status_Desc: Status_Desc,
        DR_NO: DR_NO
      },
    ]);
  };

  const deleteStatus = (Status) => {
    Axios.delete('http://localhost:3002/api/delete/${DR_NO}');
  };

  const updateStatus = (Status) => {
    Axios.put('http://localhost:3002/api/update', {
      Status: newStatus,
      Status_Desc: Status_Desc,
      DR_NO: DR_NO
    });
    setNewStatus("")
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>

      <div className = 'form'>
        <label>Status: Only 2 Characters</label>
        <input type="text" name="Status" onChange={(e) => {
          setStatus(e.target.value)
        }}/>
        <label>Status Description:</label>
        <input type="text" name="Status_Desc" onChange={(e) => {
          setStatusDesc(e.target.value)
        }}/>
        <label>DR_NO:</label>
        <input type="text" name="DR_NO" onChange={(e) => {
          setDRNO(e.target.value)
        }}/>

        <button onClick={insertStatus}>INSERT</button>

        {statusList.map((val) => {
          return (
            <div className = "card">
              <h1>Status:{val.Status}</h1>
              <p>Status Description: {val.Status_Desc}</p>
              <button onClick={() => {deleteStatus(val.DR_NO)}}>DELETE</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewStatus(e.target.value)
              }} />
              <button onClick={() => {
                updateStatus(val.Status)
              }}>UPDATE</button>
            </div>
          );
          ;
        })}

      </div>

    </div>
  );
}

export default App;
