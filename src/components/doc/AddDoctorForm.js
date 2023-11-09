import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorsService from '../../services/doctorsService';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    image: '', 
  });
  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const images = [
    'Doctor1.png',
    'Doctor2.png',
    'Doctor3.png',
    'Doctor4.png',
    'Doctor5.png',
    'Doctor6.png',
    'Doctor7.png',
    'Doctor8.png',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackToList = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const imageUrl = formData.image ? `/assets/${formData.image}` : '';

    const data = {
      name: formData.name,
      specialty: formData.specialty,
      image_url: imageUrl, 
    };
  
    try {
      const response = await doctorsService.addDoctor({ doctor: data }); 
      console.log(response.data.message);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }

    setFormData({ 
      name: '',
      specialty: '',
      image: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="doctorlist-container">
      <h2 className="mb-4" style={{ fontWeight: '700' }}>ADD A NEW DOCTOR</h2>
      <hr style={{ width: '10%', border: 'none', borderBottom: '3px dotted #c2bfbf', margin: '0 auto 10px' }} />
      <form onSubmit={handleSubmit} className="border p-4 shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">Specialty:</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image (optional):</label>
          <select
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select an image</option>
            {images.map((image, index) => (
              <option key={index} value={image}>
                {image}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-doctor-btn btn btn-primary">ADD DOCTOR</button>
        <button type="button" className="btn btn-link" onClick={handleBackToList}>
          BACK TO DOCTORS LIST
        </button>

        {showModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p>The doctor has been added successfully!</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddDoctorForm;
