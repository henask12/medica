import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import mockDoctors from './data/mockDoctorsData'; 

function App() {

  const handleDelete = (id) => {
    console.log('Doctor with ID', id, 'will be deleted.');
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors List</Link>
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

