import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import React from 'react';
import DoctorList from './components/doc/DoctorList';
import Signup from './components/user/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Signup />}/>
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/doctors" element={
            <>
            <Sidebar />
            <DoctorList />
            </>
            } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
