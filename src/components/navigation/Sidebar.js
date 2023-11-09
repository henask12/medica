import React, { useState, useEffect } from "react";
import { Card, List, ListItem, ListItemText } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/usersSlice";
import BookIcon from '@mui/icons-material/Book';


const sidebarStyle = {
  position: "fixed",
  left: 10,
  top: 0,
  bottom: 0,
  height: "100vh",
  width: "14rem",
  backgroundColor: "white",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
  zIndex: 1000,
  fontSize: "5rem",
};

const listItemStyle = "flex items-center px-6 py-3 transition duration-300 ease-in-out";
const listItemHoverStyle = "bg-gray-100";
const listItemActiveStyle = "bg-yellow-700";

const centerListStyle = "flex flex-col justify-center mt-8 ml-6";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        console.log('Logout failed:', error);
      });
  };

  return (
    <div>
      {isMobile ? (
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md">
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
        </button>
      ) : null}

      {showSidebar && (
        <Card style={sidebarStyle}>
          {isMobile && (
            <button onClick={closeSidebar} className="fixed top-4 right-4 z-50 p-2 bg-gray-100 rounded-md">

              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
              >
              <path
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
              </svg>

            </button>
          )}

          <div className="bg-teal-500 text-white py-8 px-8">
            <h1 className="text-2xl font-semibold">24 Hour Doctor</h1>
          </div>

          <div className={centerListStyle}>
            <List>
              <ListItem
                button
                component={NavLink}
                to="/"
                activeClassName={listItemActiveStyle}
                className={`${listItemStyle} hover:${listItemHoverStyle}`}
              >
                <AccountBoxIcon className="mr-2" /> {/* Icon */}
                <ListItemText primary="Doctors" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/reservation"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <BookIcon className="mr-2" />
                <ListItemText primary="My Reservation" />
              </ListItem>
              
              <ListItem
                button
                component={NavLink}
                to="/addDoctor"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <AddBoxIcon className="mr-2" />
                <ListItemText primary="Add Doctor" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/deleteDoctor"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <DeleteIcon className="mr-2" />
                <ListItemText primary="Delete Doctor" />
              </ListItem>
              <ListItem
                button
                onClick={handleLogout}
                className={`${listItemStyle} hover:${listItemHoverStyle} mt-8`}
              >
                <LogoutIcon className="mr-2" />
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
