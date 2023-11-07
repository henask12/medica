
import logo from './logo.svg';
import './App.css';
import Auth from './components/auth/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import Sidebar from './components/navigation/Sidebar'
import SignIn from './components/auth/SignIn';
import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import DoctorList from './components/doc/DoctorList';

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/" element={<Auth/>} />
        </Routes>
      </div>
    </Router>
      <Router>
        <div>
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/" element={<Auth />} />
          <Routes>
            
            <Route path="/doctors" element={<DoctorList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
