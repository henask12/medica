import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserByEmail } from "../../redux/usersSlice";
import {
  geByUserId,
  updateReservation,
  deleteReservation,
} from "../../redux/reservation/reservationSlice";
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [editedCity, setEditedCity] = useState("");
  const [editedDate, setEditedDate] = useState(new Date());
  const [reservationToUpdate, setReservationToUpdate] = useState(null);
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

  const isLargeScreen = useMediaQuery("(min-width:768px");

  const handleUpdate = (reservation) => {
    setReservationToUpdate(reservation);
    setEditedCity(reservation.city);
    setEditedDate(new Date(reservation.date));
    setUpdateDialogOpen(true);
  };

  const handleCityChange = (event) => {
    setEditedCity(event.target.value);
  };

  const handleDateChange = (date) => {
    setEditedDate(date);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleDelete = (reservationId) => {
    setReservationToDelete(reservationId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setReservationToDelete(null);
    setDeleteDialogOpen(false);
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex flex-col card shadow-lg m-4 bg-gray-100">
      <div className="flex flex-row justify-between">
        <div
          className={`flex flex-col card ${
            isLargeScreen ? "w-4/4" : "w-3/4"
          } bg-gray-100 p-4 rounded-lg`}
          style={isLargeScreen ? { marginLeft: "16rem" } : {}}
        >
          <h1 className="text-xl font-bold">My Reservations</h1>
        </div>
      </div>
      <div
        className={`flex flex-col card ${
          isLargeScreen ? "w-4/4" : "w-3/4"
        } bg-white p-4 rounded-lg`}
        style={isLargeScreen ? { marginLeft: "16rem" } : {}}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Doctor</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((reservation, index) => (
                <StyledTableRow key={reservation.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{reservation.city}</StyledTableCell>
                  <StyledTableCell>
                    {getDoctorName(reservation.doctor_id)}
                  </StyledTableCell>
                  <StyledTableCell>{reservation.date}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleUpdate(reservation)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(reservation.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle className="bg-red-600 text-white">
          Delete Reservation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseDeleteDialog();
              if (reservationToDelete) {
                dispatch(deleteReservation(reservationToDelete))
                  .then(() => {
                    showSuccessToast("Reservation deleted successfully");
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  })
                  .catch((error) => {
                    showErrorToast("Failed to delete reservation");
                  });
              }
            }}
           color="warning"
           variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog} fullWidth maxWidth="sm">
        <DialogTitle className="bg-yellow-500 text-white">Edit Reservation</DialogTitle>
        <DialogContent>
          <div className="my-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">City</label>
            <TextField
              label="City"
              fullWidth
              value={editedCity}
              onChange={handleCityChange}
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Date</label>
            <DatePicker
              selected={editedDate}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border rounded"
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4 bg-white-100">
          <Button onClick={handleCloseUpdateDialog} variant="outlined" color="primary" className="mr-4">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseUpdateDialog();
              if (reservationToUpdate) {
                dispatch(
                  updateReservation({
                    reservationId: reservationToUpdate.id,
                    editedData: { city: editedCity, date: editedDate },
                  })
                )
                  .then(() => {
                    showSuccessToast("Reservation updated successfully");
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  })
                  .catch((error) => {
                    showErrorToast("Failed to update reservation");
                  });
              }
            }}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ReservationList;
