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
  const backendAddress = "https://whhuang4-cautious-goggles-4499vqp7pwvfqr4x-3002.preview.app.github.dev"
  // states under statusList
  const [Status, setStatus] = useState('');
  const [Status_Desc, setStatusDesc] = useState('');
  const [DR_NO, setDRNO] = useState(0);
  const [newStatusDesc, setNewStatusDesc] = useState("");
  // lists states
  const [statusList, setStatusList] = useState([]);
  const [victimByAreaList, setvictimByAreaList] = useState([]);
  const [victimByWeaponList, setvictimByWeaponList] = useState([]);
  // to determine frontend (different list)
  const [listState, setListState] = useState(0);

  // search feature
  const [searchInput, setSearchInput] = useState('');

  console.log('Hello');
  console.log(backendAddress + '/api/get');
  const refreshList = () => {
    Axios.get(backendAddress + '/api/get/list0', { params: { _cache: Date.now() }})
    .then((response) => {
      console.log('Sending request to backend server...');
      setStatusList(response.data);
    })
  };

  const getAreaVictimList = () => {
    Axios.get(backendAddress + '/api/get/list1', { params: { _cache: Date.now() }})
    .then((response) => {
      console.log('Sending request to backend server...');
      setvictimByAreaList(response.data);
    })
  };

  const getWeaponVictimList = () => {
    Axios.get(backendAddress + '/api/get/list2', { params: { _cache: Date.now() }})
    .then((response) => {
      console.log('Sending request to backend server...');
      setvictimByWeaponList(response.data);
    })
  };
  useEffect(() => {
    refreshList();
  }, [])

  const insertStatus = () => {
    Axios.post(backendAddress + '/api/insert', {
      Status: Status,
      Status_Desc: Status_Desc,
      DR_NO: DR_NO
    }).then(() => {
      alert('success insert')
      refreshList(); // Call refreshList after the request has completed
    });
  };

  const deleteStatus = (DR_NO) => {
    const baseUrl = backendAddress + '/api/delete/'
    Axios.delete(`${baseUrl}${DR_NO}`).then(() => {
      alert('success delete')
      refreshList(); // Call refreshList after the request has completed
    });
  };

  const updateStatus = (DR_NO) => {
    Axios.put(backendAddress + '/api/update', {
      Status_Desc: newStatusDesc,
      DR_NO: DR_NO
    }).then(() => {
      alert('success update')
      refreshList(); // Call refreshList after the request has completed
      setNewStatusDesc("");
    });
    
  }

  const search = () => {
    const baseUrl = backendAddress + '/api/search/by/status/';
    Axios.get(`${baseUrl}${searchInput}`, { params: { _cache: Date.now() }})
    .then((response) => {
      console.log('Sending request to backend server...');
      setStatusList(response.data);
    })
  }
  let renderJSXＬist; 
  if(listState===0){
    renderJSXＬist = (
    <>
      <div>
        <input type="text" id="searchInput" onChange={(e) => {
          setSearchInput(e.target.value);
        }} />
        <button onClick={() => {
          search();
        }}>Search</button>
      </div>
        {statusList.map((val) => {
        return (
          <div className = "card">
            <h1>Status:{val.Status}</h1>
            <p>Status Description: {val.Status_Desc}</p>
            <p>DR NO: {val.DR_NO}</p>
            <button onClick={() => {deleteStatus(val.DR_NO)}}>DELETE</button>
            <input type="text" id="updateInput" onChange={(e) => {
              setNewStatusDesc(e.target.value)
            }} />
            <button onClick={() => {
              updateStatus(val.DR_NO)
            }}>UPDATE</button>
          </div>
        );
      })}
    </>
    )
  }
  else if(listState===1){
    //victimByAreaList
    console.log()
    renderJSXＬist = victimByAreaList.map((val) => {
      return (
        <div className = "card">
          <h1>Area: {val.Area}</h1>
          <p>Victim Count: {val.Victim_Count}</p>
        </div>
      );
    });
  }
  else if(listState===2){
    //victimByAreaList
    renderJSXＬist = victimByWeaponList.map((val) => {
      return (
        <div className = "card">
          <h1>Weapon: {val.Weapon}</h1>
          <p>Victim Count: {val.Victim_Count}</p>
        </div>
      );
    });
  }
  return (
    <div className="App">
      <h1>Crimes Map</h1>

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
        <br/>
        <div>
          <button onClick={() => {
            setListState(0);
            refreshList();
          }}>Status</button>
          <button onClick={() => {
            setListState(1);
            getAreaVictimList();
          }}>Victim Count by same Area</button>
          <button onClick={() => {
            setListState(2);
            getWeaponVictimList();
          }}>Victim Count by same Weapon</button>
        </div>
        <div>{renderJSXＬist}</div>

      </div>

    </div>
  );
}

export default App;
