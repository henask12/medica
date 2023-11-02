import React from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function DoctorCard({ doctor, onDelete }) {
  return (
    <div className="card-container">
      <div className="doctor-card">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" /> 
        <h3>{doctor.name}</h3>
        <p>Specialty: {doctor.specialty}</p>
        <p>City: {doctor.city}</p>
        <p>{doctor.description}</p>
        <button onClick={() => onDelete(doctor.id)} className="delete-button">Delete</button> 
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DoctorCard;
