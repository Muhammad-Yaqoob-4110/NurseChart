import React from "react";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Loggedout from "./components/loggedout";

function App() {
  return (
    <Router>
      <div className="h-screen bg-[#f0f5fe] font-['Roboto']">
        <NurseChart />
      </div>
    </Router>
  );
}

function NurseChart() {
  // Now useLocation is correctly inside the Router
  const location = useLocation();

  // Determine the navbar text based on the current route
  let navbarText = '';
  switch (location.pathname) {
    case '/login':
      navbarText = 'Login Page';
      break;
    case '/register':
      navbarText = 'Register Page';
      break;
    case '/home':
      navbarText = 'Home Page';
      break;
    case '/loggedout':
      navbarText = 'Logged Out';
      break;
    default:
      navbarText = 'Default Text';
  }

  return (
    <>
      <Navbar text={navbarText} />
      <div>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loggedout" element={<Loggedout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
