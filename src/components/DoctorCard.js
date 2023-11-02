import React from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import DeleteButton from './DeleteButton';

function DoctorCard({ doctor, onDelete }) {
  return (
    <div className="d-flex justify-content-center my-4">
      <div className="card" style={{ width: '18rem' }}>
        <img src={doctor.image} alt={doctor.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{doctor.name}</h5>
          <p className="card-text">Specialty: {doctor.specialty}</p>
          <p className="card-text">City: {doctor.city}</p>
          <p className="card-text">{doctor.description}</p>
          <DeleteButton id={doctor.id} onDelete={onDelete} />
        </div>
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
