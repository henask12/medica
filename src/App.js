import logo from './logo.svg';
import './App.css';
import Auth from './components/auth/auth';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import SignIn from './components/auth/SignIn';
import DoctorList from './components/doc/DoctorList';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/doctors" className="nav-link">Doctors List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/" element={<Auth />} />
            <Route path="/doctors" element={<DoctorList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
