
import './App.css';
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import RequestQuote from './components/RequestQuote';
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";

function App() {

  const [loginEmail, setLoginEmail] = useState('');
  useEffect(() => {
    const loggedInCheck = localStorage.getItem("login");
    if (loggedInCheck) {
      setLoginEmail(loggedInCheck);
      console.log('Logged in');
      if (window.location.pathname === '/login') {
        window.location = '/quote';
      }
    }
    else {
      console.log('Not logged in');
      if (window.location.pathname !== '/login') {
        window.location = '/login';
      }
    }
  }, []);

  return (

    <div>
      <Header loginEmail={loginEmail} />
      <Routes>
        <Route exact path='/' element={<Main loginEmail={loginEmail} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quote" element={<RequestQuote />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
