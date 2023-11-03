import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import DoctorList from './components/DoctorList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">Doctors List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/doctors" element={<DoctorList />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
