import { useEffect, useState } from 'react';
import React, { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Construct from './Construct.js';
import ErrorNotification from './ErrorNotification';
import './App.css';
import Nav from "./Nav";
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import { AuthProvider, useToken } from "./Authentication";
import EventForm from './EventForm';
import AccountList from './ListAccounts.js';
import EventList from './ListEvents.js';
import EventDetailPage from './EventDetail.js';
import AccountDetailPage from './AccountDetail.js';


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
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
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
      const [accounts, setAccounts] = useState([])

      const getAccounts = async () => {
        const url = 'http://localhost:8000/accounts'
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          const accounts = data.accounts
          setAccounts(accounts)
        }
      }

      useEffect(() => {

        getAccounts();

      }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/events/:eventId" element={<EventDetailPage/>} />
          <Route path="/accounts/:accountId" element={<AccountDetailPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
    </div>
  );
;
}

export default App;
