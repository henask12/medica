import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDoctors } from '../../redux/doctors/doctorsSlice';
import { useState } from 'react';
import { LabelImportantOutlined } from '@mui/icons-material';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '800px',
  margin: '0 auto',
  className: 'shadow-lg rounded-lg',
});

const Image = styled(CardMedia)({
  width: '50%',
  objectFit: 'cover',
  className: 'rounded-l-lg',
});

const FormContainer = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem',
  width: '50%',
});

const FormField = styled(TextField)({
  marginBottom: '1rem',
  className: 'mb-4',
});

const ReserveButton = styled(Button)({
  marginTop: '2rem',
  className: 'bg-yellow-500 text-white hover:bg-green-600',
  backgroundColor: "#a3e635"
});

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const { doctors, isLoading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (doctors) {
      const matchedDoctor = doctors.find((doc) => doc?.id === parseInt(id));
      setDoctor(matchedDoctor);
    }
  }, [doctors, id]);

  const handleReserveClick = () => {
    // Handle reservation click here
  };

  return (
    <Container>
      <StyledCard>
        <Image
          component="img"
          src={doctor?.image_url}
          alt={doctor?.name}
        />
        <FormContainer>
          <h2 className="text-2xl font-semibold mb-4">Doctor Details</h2>
          <FormField
            label="Name"
            variant="outlined"
            value={doctor?.name || "N/A"}
            InputProps={{
              readOnly: true,
            }}
          />
          <FormField
            label="Specialty"
            variant="outlined"
            value={doctor?.specialty || "N/A"}
            InputProps={{
              readOnly: true,
            }}
          />
          <Link to={`/reservation/${id}`}>
            <ReserveButton
              variant="contained"
              onClick={handleReserveClick}
            >
              Reserve
            </ReserveButton>
          </Link>
        </FormContainer>
      </StyledCard>
    </Container>
  );
}

export default DoctorDetails;
