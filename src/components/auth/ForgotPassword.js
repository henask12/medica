import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a reset password email logic can be added here

    // Clear the email field
    setEmail('');
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
        >
          Send Reset Email
        </Button>
      </form>
    </Container>
  );
}

export default ForgotPassword;
