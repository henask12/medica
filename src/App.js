import './App.css';
import Auth from './components/auth/auth';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import Sidebar from './components/navigation/Sidebar';
import SignIn from './components/auth/SignIn';
import React from 'react';
import DoctorList from './components/doc/DoctorList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/doctors"
            element={
              <div className="flex">
                <Sidebar />
                <DoctorList />
              </div>
            }
          >
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
