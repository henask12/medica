import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserByEmail } from "../../redux/usersSlice";
import { geByUserId } from "../../redux/reservation/reservationSlice";
import { useMemo } from "react";
import { fetchDoctors } from "../../redux/doctors/doctorsSlice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const dispatch = useDispatch();
  const { reservation, isLoading, error } = useSelector(
    (state) => state.reservation
  );

  const fetchReservations = useMemo(() => {
    const email = localStorage.getItem("email");

    return async () => {
      const user = await dispatch(searchUserByEmail(email));
      const userId = user.payload.user.id;
      const reservationResponse = await dispatch(geByUserId(userId));

      if (reservationResponse.payload) {
        setReservations(reservationResponse.payload);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const { doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((doctor) => doctor.id === doctorId);
    return doctor?.name ?? "Unknown doctor";
  };

  const isLargeScreen = useMediaQuery("(min-width:768px)");

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div className="flex flex-col card shadow-lg m-4 bg-gray-100">
      <div className="flex flex-row justify-between" >
        <div className={`flex flex-col card sidebar-content ${isLargeScreen ? 'sidebar-desktop' : 'sidebar-mobile'}`} style={isLargeScreen ? { marginLeft: '16rem' } : {}}>
          <h1 className="text-xl font-bold">My Reservations</h1>
        </div>
      </div>
      <div className={`flex flex-col card sidebar-content ${isLargeScreen ? 'sidebar-desktop' : 'sidebar-mobile'}`} style={isLargeScreen ? { marginLeft: '16rem' } : {}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.city}</TableCell>
                  <TableCell>{getDoctorName(reservation.doctor_id)}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReservationList;