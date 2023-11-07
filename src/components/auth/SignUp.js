import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { createUser } from "../../redux/usersSlice";
import { useNavigate } from "react-router";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleErrorDialogOpen = () => {
    setOpenErrorDialog(true);
  };

  const handleErrorDialogClose = () => {
    setOpenErrorDialog(false);
    setError(null);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, email, password, password_confirmation } = formData;

    if (!name || !email || !password || !password_confirmation) {
      setError("All fields are required.");
      handleErrorDialogOpen();
      return;
    }

    if (password.length < 6) {
        setError("Password must have at least 6 characters.");
        handleErrorDialogOpen();
        return;
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match.");
      handleErrorDialogOpen();
      return;
    }

    try {
      const userData = {
        user: {
          name,
          email,
          password,
          password_confirmation,
        },
      };
      const action = await dispatch(createUser(userData));
debugger
      if (createUser.fulfilled.match(action)) {
        navigate('/sidebar');
      } else if (createUser.rejected.match(action)) {
        setError("Sign-up failed: " + action.error.message);
        handleErrorDialogOpen();
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
      handleErrorDialogOpen();
    }

    // Clear the form
    setFormData({
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
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button>Sign Up</button>
      </form>

      <Dialog open={openErrorDialog} onClose={handleErrorDialogClose}>
        <DialogContent>
          <div>{error}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUpForm;
