import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorsService from '../../services/doctorsService';
import MessageDialog from './MessageDialog'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/animated';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    image: '', 
  });
  
  const [showMessage, setShowMessage] = useState(false); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const images2 = [
    { value: 'Doctor1.png', label: 'Doctor1', image: '/assets/Doctor1.png' },
    { value: 'Doctor2.png', label: 'Doctor2', image: '/assets/Doctor2.png' },
    { value: 'Doctor3.png', label: 'Doctor3', image: '/assets/Doctor3.png' },
    { value: 'Doctor4.png', label: 'Doctor4', image: '/assets/Doctor4.png' },
    { value: 'Doctor5.png', label: 'Doctor5', image: '/assets/Doctor5.png' },
    { value: 'Doctor6.png', label: 'Doctor6', image: '/assets/Doctor6.png' },
    { value: 'Doctor7.png', label: 'Doctor7', image: '/assets/Doctor7.png' },
    { value: 'Doctor8.png', label: 'Doctor8', image: '/assets/Doctor8.png' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#blue' : '#ddd',
      boxShadow: state.isFocused ? '0 0 0 1px #blue' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#blue' : '#ddd',
      },
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isFocused ? '#f3f3f3' : isSelected ? '#eee' : null,
      color: '#333',
      padding: 20,
    }),
    menu: (provided) => ({
      ...provided,
      position: 'absolute', 
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
      border: 'none',
      maxHeight: '300px', 
      overflowY: 'auto',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#333',
    }),
  };


  const formatOptionLabel = ({ value, label, image }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={image} alt={label} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
      <span style={{ fontSize: '16px' }}>{label}</span> 
    </div>
  );

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
    <div className="doctorform-container">
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
          <Select
            id="image"
            name="image"
            value={images2.find(img => img.value === formData.image)}
            onChange={selectedOption => setFormData({ ...formData, image: selectedOption.value })}
            options={images2}
            formatOptionLabel={formatOptionLabel}
            components={makeAnimated()}
            styles={customStyles}
            menuPlacement="top"
          />
        </div>

        <button type="submit" className="add-doctor-btn btn rounded-btn">ADD DOCTOR</button>
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
