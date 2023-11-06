import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoctorCard from './DoctorCard';
import Slider from 'react-slick';
import '../../DoctorList.css';
import { fetchDoctors } from '../../redux/doctors/doctorsSlice';

function DoctorList() {
  const dispatch = useDispatch();
  const { doctors, isLoading, error } = useSelector((state) => state.doctors); 

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);
  
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
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </Slider>
      ) : (
        <div className="text-center">No doctors available at the moment.</div>  
      )}
    </div>
  );
}

export default DoctorList;
