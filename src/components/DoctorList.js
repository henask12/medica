import React from 'react';
import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';
import Slider from 'react-slick';
import '../DoctorList.css';

function DoctorList({ doctors, onDelete }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:false
        }
      }
    ]
  };

  return (
    <div>
      <h2>Doctors List</h2>
      <Slider {...settings}>
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} onDelete={onDelete} />
        ))}
      </Slider>
    </div>
  );
}

DoctorList.propTypes = {
  doctors: PropTypes.arrayOf(
  ).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DoctorList;
