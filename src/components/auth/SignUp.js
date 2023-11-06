import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { createUser } from "../../redux/usersSlice";

function SignUpForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [stateReg, setStateReg] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setStateReg({
      ...stateReg,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, email, password, password_confirmation } = stateReg;
  
    if (password !== password_confirmation) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const userData = {
        user: {
          name,
          email,
          password,
          password_confirmation,
        }
      };
  
      await dispatch(createUser(userData));
  debugger
      if(user){

      }
     
    } catch (error) {
     
    }
  
    setStateReg({
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
          value={stateReg.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={stateReg.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={stateReg.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password_confirmation"
          value={stateReg.password_confirmation}
          onChange={handleChange}
          placeholder="Conform Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
