import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import React from 'react';
import DoctorList from './components/doc/DoctorList';
import Signup from './components/user/SignUp';
import { useSelector } from 'react-redux';
import Signin from './components/user/SignIn';

function App() {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
debugger
  return (
    <div className="App">
      <Router>
        <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={
            <>
              <Sidebar />
              <DoctorList />
            </>} />
            <Route path="/sidebar" element={<Sidebar />} />
          </>
        ) : 
          <>
            <Route path="/" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
          </>
        }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
