import React from "react";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Loggedout from "./components/loggedout";

function App() {
  return (
    <Router>
      <div className="h-screen bg-[#f0f5fe] font-['Roboto']">
      <Navbar/>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loggedout" element={<Loggedout />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
