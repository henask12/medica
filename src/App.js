import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import React from 'react';
import DoctorList from './components/doc/DoctorList';
import Signup from './components/user/SignUp';
import { useSelector } from 'react-redux';
import Signin from './components/user/SignIn';
import ReservationList from './components/reservation/ReservationList';
import AddDoctorForm from './components/doc/AddDoctorForm';
import RemoveDoctorsList from './components/doc/RemoveDoctorsList';
import DoctorDetails from './components/reservation/ReserveDoctor';

function App() {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const storedEmail = localStorage.getItem('email');

  return (
    <div className="App">
      <Router>
        <Routes>
        {(isAuthenticated || storedEmail) ? (
          <>
            <Route path="/" element={
            <>
              <Sidebar />
              <DoctorList />
            </>} />
            <Route path="/reservation" element={
            <>
              <Sidebar />
              <ReservationList />
            </>} />

            <Route path="/addDoctor" element={
            <>
              <Sidebar />
              <AddDoctorForm />
            </>} />

            <Route path="/deleteDoctor" element={
            <>
              <Sidebar />
              <RemoveDoctorsList />
            </>} />
            <Route path="/doctors/:id" element={ <>
              <Sidebar />
              <DoctorDetails />
            </>} />
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
