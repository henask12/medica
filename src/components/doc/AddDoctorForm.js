import React, { useState } from 'react';
import doctorsService from '../../services/doctorsService';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    image: null,
  });
  
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('doctor[name]', formData.name);
    data.append('doctor[specialty]', formData.specialty);
  
    if (formData.image) {
      data.append('doctor[image]', formData.image, formData.image.name);
    }
  
    try {
      const response = await doctorsService.addDoctor(data);
      console.log(response.data.message);
      setShowModal(true); 
    } catch (error) {
      console.error(error);
      
    }

    setFormData({ 
      name: '',
      specialty: '',
      image: null,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="doctorlist-container">
      <h2 className="mb-4">ADD A NEW DOCTOR</h2>
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
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="rounded-btn">ADD DOCTOR</button>
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