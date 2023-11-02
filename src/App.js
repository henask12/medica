import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import mockDoctors from './data/mockDoctorsData'; 
import handleDelete from './components/DeleteButton';

function App() {
  const handleDelete = (id) => {
    console.log('Doctor with ID', id, 'will be deleted.');
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">Doctors List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/doctors" element={<DoctorList doctors={mockDoctors} onDelete={handleDelete} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
