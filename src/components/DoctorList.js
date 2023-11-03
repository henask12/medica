import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';
import Slider from 'react-slick';
import '../DoctorList.css';
import api from '../components/api/api';

function DoctorList({ onDelete }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    api.get('http://localhost:3000/api/doctors')
      .then(response => {
        if (response.status !== 204) {
          setDoctors(response.data);
        } else {
          console.log("No content in the response");
        }
        setIsLoading(false);  
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setIsLoading(false);  
      });
  }, []);
  
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
          slidesToShow: 2,
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
    <div className="doctorlist-container">
      <h2 className="text-center">DOCTORS LIST</h2>
      <p className="text-center" style={{ color: '#777', fontSize: '0.9em' }}>
        Here you can find the best Doctors
      </p>
      <hr style={{ width: '10%', border: 'none', borderBottom: '3px dotted #c2bfbf', margin: '0 auto 10px' }} />
      {isLoading ? (
        <div className="text-center">Loading doctors...</div>  
      ) : doctors.length > 0 ? (
        <Slider {...settings}>
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} onDelete={onDelete} />
          ))}
        </Slider>
      ) : (
        <div className="text-center">No doctors available at the moment.</div>  
      )}
    </div>
  );
}

DoctorList.propTypes = {
  onDelete: PropTypes.func,
};

export default DoctorList;
