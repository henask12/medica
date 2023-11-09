import React from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import DeleteButton from './DeleteButton';

function DoctorCard({ doctor, onDelete, isDeletePage }) {
  return (
    <div className="d-flex justify-content-center my-4">
      <div className="card shadow text-center" style={{
        width: '350px',
        height: 'auto',
        borderRadius: '20px',
        borderColor: '#e3e3e3',
        transition: 'transform 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img src={doctor.image_url} alt={doctor.name} className="card-img-top mx-auto" style={{
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          maxWidth: '100%',
          height: '150px',
          objectFit: 'cover'
        }} />
        <div className="card-body">
          <h5 className="card-title doctor-name" style={{ fontWeight: '700' }}>{doctor.name}</h5>
          <p className="card-text" style={{ color: '#777', fontSize: '0.9em' }}>Specialty: {doctor.specialty}</p>
          <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          </div>
              {isDeletePage ? (
            <DeleteButton onDelete={onDelete} id={doctor.id} />
          ) : (
            <button className="rounded-btn">Details</button>
          )}
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
    image_url: PropTypes.string
  }),
  onDelete: PropTypes.func,
  isDeletePage: PropTypes.bool 
};

export default DoctorCard;