import { useEffect, useState } from 'react';
import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import Construct from './Construct.js';
import ErrorNotification from './ErrorNotification';
import './App.css';
import LoginForm from "./LoginForm";
import { AuthProvider, useToken } from "./Authentication";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
    </div>
  );
;
}

export default App;
