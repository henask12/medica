import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserByEmail } from "../../redux/usersSlice";
import { geByUserId } from "../../redux/reservation/reservationSlice";
import { useMemo } from "react";
import { fetchDoctors } from "../../redux/doctors/doctorsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
      <div className="flex flex-row justify-between">
        <div
          className={`flex flex-col card sidebar-content ${
            isLargeScreen ? "sidebar-desktop" : "sidebar-mobile"
          }`}
          style={isLargeScreen ? { marginLeft: "16rem" } : {}}
        >
          <h1 className="text-xl font-bold">My Reservations</h1>
        </div>
      </div>
      <div
        className={`flex flex-col card sidebar-content ${
          isLargeScreen ? "sidebar-desktop" : "sidebar-mobile"
        }`}
        style={isLargeScreen ? { marginLeft: "16rem" } : {}}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Doctor</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((reservation) => (
                <StyledTableRow key={reservation.id}>
                  <StyledTableCell>{reservation.id}</StyledTableCell>
                  <StyledTableCell>{reservation.city}</StyledTableCell>
                  <StyledTableCell>
                    {getDoctorName(reservation.doctor_id)}
                  </StyledTableCell>
                  <StyledTableCell>{reservation.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReservationList;