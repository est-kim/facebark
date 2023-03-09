import { useEffect, useState } from 'react';
import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from "./Nav";
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import { AuthProvider } from "./Authentication";
import EventForm from './EventForm';
import AccountList from "./ListAccounts.js";
import EventList from "./ListEvents.js";
import EventDetailPage from "./EventDetail.js";
import AccountDetailPage from "./AccountDetail.js";
import FollowingList from './FollowingList.js';
import MyFollowers from './MyFollowers.js';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [, setAccounts] = useState([]);

  const getAccounts = async () => {
    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`;
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
      <BrowserRouter basename={basename}>
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
            <Route path="/accounts/:accountId" element={<AccountDetailPage />} />
            <Route path="/followinglist" element={<FollowingList />}
            />
            <Route path="/followers" element={<MyFollowers />}
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
