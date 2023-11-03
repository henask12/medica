import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SignInForm() {
  const [state, setState] = React.useState({
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
      </form>
    </div>
  );
}

export default SignInForm;
