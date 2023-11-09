import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, fetchDoctors } from '../../redux/doctors/doctorsSlice';
import DoctorCard from './DoctorCard';
import Slider from 'react-slick';
import './DoctorList.css';

function RemoveDoctorsList() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      dispatch(deleteDoctor(id));
      setPopupMessage('Doctor has been removed successfully.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); 
    }
  };

  const slidesToShowDefault = 3;
  const settings = {
    dots: doctors.length > slidesToShowDefault,
    infinite: doctors.length > slidesToShowDefault,
    speed: 500,
    slidesToShow: 2,  
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

  const renderPopup = () => {
    if (!showPopup) return null;

    return (
      <div className="popup-container">
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className="doctorlist-container">
      <h2 style={{ fontWeight: '700' }}>REMOVE DOCTORS</h2>
      <p className="text-center" style={{ color: '#777', fontSize: '0.9em' }}>
        Here you can delete the Doctors
      </p>
      <hr style={{ width: '10%', border: 'none', borderBottom: '3px dotted #c2bfbf', margin: '0 auto 10px' }} />
      {doctors.length > 0 ? (
        <Slider {...settings}>
          {doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id}
              doctor={doctor}
              onDelete={handleDelete}
              isDeletePage={true}
            />
          ))}
        </Slider>
      ) : (
        <div className="text-center">No doctors available to remove at the moment.</div>
      )}
    </div>
  );
}

export default RemoveDoctorsList;