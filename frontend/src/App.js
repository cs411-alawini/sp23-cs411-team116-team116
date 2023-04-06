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
  const [newStatusDesc, setNewStatusDesc] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      // console.log(response.data);
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
        Status_Desc: 'Status Desc',
        DR_NO: DR_NO
      },
    ]);
  };

  const deleteStatus = (DR_NO) => {
    const baseUrl = 'http://localhost:3002/api/delete/'
    Axios.delete(`${baseUrl}${DR_NO}`);
  };

  const updateStatus = (DR_NO) => {
    Axios.put('http://localhost:3002/api/update', {
      Status_Desc: newStatusDesc,
      DR_NO: DR_NO
    });
    setNewStatusDesc("")
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
                setNewStatusDesc(e.target.value)
              }} />
              <button onClick={() => {
                updateStatus(val.DR_NO)
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
