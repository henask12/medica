import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchDoctors } from '../../redux/doctors/doctorsSlice';
import { searchUserByEmail } from '../../redux/usersSlice';
import { createReservation } from '../../redux/reservation/reservationSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

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
  backgroundColor: "#a3e635",
});

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [reservationData, setReservationData] = useState({
    doctorId: id,
    city: '',
    date: new Date(),
  });
  const [userId, setUserId] = useState(null);

  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());

    dispatch(searchUserByEmail(email)).then((user) => {
      setUserId(user.payload.user.id);
    });
  }, [dispatch, email]);

  useEffect(() => {
    if (doctors) {
      const matchedDoctor = doctors.find((doc) => doc?.id === parseInt(id));
      setDoctor(matchedDoctor);
    }
  }, [doctors, id]);
  const navigate = useNavigate();
  const handleReserveClick = () => {
    if (!reservationData.city.trim()) {
        toast.error("City cannot be empty");
        return;
      }
    const formattedReservationData = {
      reservation: {
        date: reservationData.date.toISOString(),
        city: reservationData.city,
        user_id: userId,
        doctor_id: id,
      },
    };

    dispatch(createReservation(formattedReservationData))
      .then(() => {
        toast.success("Reservation created successfully!");

        setTimeout(() => {
          navigate('/');
        }, 3000);      })
      .catch((error) => {
        toast.error("An error occurred while creating the reservation.");

      });
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
          <FormField
            label="Enter City"
            variant="outlined"
            InputProps={{
              readOnly: false,
            }}
            value={reservationData.city}
             onChange={(e) => setReservationData({ ...reservationData, city: e.target.value })}
          />
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Date
            </label>
            <DatePicker
              selected={reservationData.date}
              onChange={(date) => setReservationData({ ...reservationData, date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border rounded"
            />
          </div>
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
      <ToastContainer />
    </Container>
  );
}

export default DoctorDetails;
