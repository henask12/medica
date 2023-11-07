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
            
            <Route path="/doctors" element={<DoctorList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
