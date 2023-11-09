import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorsService from '../../services/doctorsService';
import MessageDialog from './MessageDialog'; 

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    image: '', 
  });
  
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el diálogo
  const [message, setMessage] = useState('');
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
      setMessage('The doctor has been added successfully!');
      setShowMessage(true);
    } catch (error) {
      setMessage('Failed to add the doctor. Please try again.');
      setShowMessage(true);
      console.error(error);
    }

    setFormData({ 
      name: '',
      specialty: '',
      image: '',
    });
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
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
        <MessageDialog
        open={showMessage}
        handleClose={handleCloseMessage}
        message={message}
      />
    
      </form>
    </div>
  );
};

export default AddDoctorForm;
