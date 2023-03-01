import { useEffect, useState } from 'react';
import React, { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Construct from './Construct.js';
import ErrorNotification from './ErrorNotification';
import './App.css';
import Nav from "./Nav";
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import { AuthProvider, useToken } from "./Authentication";
import EventForm from './EventForm';
import AccountList from "./ListAccounts.js";
import EventList from "./ListEvents.js";
import EventDetailPage from "./EventDetail.js";
import AccountDetailPage from "./AccountDetail.js";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const url = "http://localhost:8000/accounts";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const accounts = data.accounts;
      setAccounts(accounts);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/events/new" element={<EventForm />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route
              path="/accounts/:accountId"
              element={<AccountDetailPage />}
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
