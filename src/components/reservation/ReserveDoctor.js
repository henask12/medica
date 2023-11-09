import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDoctors } from '../../redux/doctors/doctorsSlice';
import { useState } from 'react';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '4rem',
});

const StyledCard = styled(Card)({
  display: 'flex',
  maxWidth: '800px',
  margin: '0 auto',
});

const Image = styled(CardMedia)({
  width: '50%',
  objectFit: 'cover',
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
});

const FormContainer = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem',
});

const FormField = styled(TextField)({
  marginBottom: '1rem',
});

const ReserveButton = styled(Button)({
  marginTop: '2rem',
  backgroundColor: "#8dd431"
});

function DoctorDetails() {
    debugger
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const { doctors, isLoading, error } = useSelector((state) => state.doctors); 

  useEffect(() => {
          dispatch(fetchDoctors());
    }, [dispatch]); 


    useEffect(() => {
        debugger
        if (doctors) {
          const matchedDoctor = doctors.find((doc) => doc?.id === parseInt(id));
          setDoctor(matchedDoctor);
        }
      }, [doctors, id]);
    
const [isMouseEntered, setIsMouseEntered] = useState(false);


  const handleReserveClick = () => {
    
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
          <FormField
            label="Name"
            variant="outlined"
            value={doctor?.name || "N/A"}
            InputProps={{
                readOnly: true,
                onMouseEnter: () => setIsMouseEntered(true),
                onMouseLeave: () => setIsMouseEntered(false),
            }}
          />
          <FormField
            label="Specialty"
            variant="outlined"
            value={doctor?.specialty || "N/A"}
            InputProps={{
                readOnly: true,
                onMouseEnter: () => setIsMouseEntered(true),
                onMouseLeave: () => setIsMouseEntered(false),
            }}

          />
          <Link to={`/reservation/${id}`}>
            <ReserveButton
              variant="contained"
              color="primary"
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