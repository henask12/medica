/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import { createUser } from '../../redux/usersSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateFormData = () => {
    const { name, email, password, password_confirmation } = formData;

    if (name === '') {
      return false;
    }
    if (email === '' || !email.includes('@') || !email.includes('.')) {
      return false;
    }
    if (password === '' || password.length < 6) {
      return false;
    }
    if (password_confirmation === '' || password_confirmation !== password) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      signup(formData);
    }
  };

  const signup = async (user) => {
    const userData = {
      user: user,
    };

    const action = await dispatch(createUser(userData));

    if (createUser.fulfilled.match(action)) {
      navigate('/sidebar');
    } else if (createUser.rejected.match(action)) {
      setError('Sign-up failed: ' + action.error.message);
      handleErrorDialogOpen();
    }
  };

  return (
    <div className="Auth-container">
      <div className="Auth-card">
        <h3 className="Auth-title">Sign Up</h3>
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/"><b>Login</b></Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
