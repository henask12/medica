
import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';


function SignInForm() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const navigate = useNavigate(); // Initialize navigate
  const handleSignIn = () => {
    // Assume successful sign-in
    navigate("/sidebar"); // Use navigate to navigate to the sidebar
  };
  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }

    // Dispatch the loginStart action to indicate the login process has started
    dispatch(loginStart());

    // Simulate API request (replace with actual fetch to your Rails API)
    setTimeout(() => {
      if (email === 'example@email.com' && password === 'password') {
        // Dispatch the loginSuccess action with user data upon successful login
        dispatch(loginSuccess({ email: email }));
      } else {
        // Dispatch the loginFailure action with an error message upon a failed login
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);

    // Clear the form fields
    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
       
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/forgot-password">Forgot your password?</Link>
        <button id="signIn" onClick={() => handleSignIn("signIn")}>
                Sign In
        </button>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

