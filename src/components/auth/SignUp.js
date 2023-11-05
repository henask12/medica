import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { createUser } from "../../redux/usersSlice";

function SignUpForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, email, password, password_confirmation } = state;
  
    if (password !== password_confirmation) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
        const userData = { name, email, password, password_confirmation };
      await dispatch(createUser(userData));
  debugger
      if (user.isAuthenticated) {
        alert("Registration successful!");
      } else if (user.error) {
        alert('Registration failed. Please check your data and try again.');
      }
    } catch (error) {
      alert('Registration failed. Please check your network connection.');
    }
  
    setState({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };
  

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>Use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password_confirmation"
          value={state.password_confirmation}
          onChange={handleChange}
          placeholder="Conform Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
