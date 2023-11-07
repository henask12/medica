import React, { useState, useEffect } from "react";
import { Card, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

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
const listItemActiveStyle = "bg-yellow-500";

const centerListStyle = "flex flex-col justify-center mt-8 ml-6";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = window.innerWidth < 768;

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

  return (
    <div>
      {isMobile ? (
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md">
          {/* Hamburger icon */}
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
          <div className={`w-6 h-0.5 mb-1 bg-gray-800 ${showSidebar ? "block" : "hidden"}`}></div>
        </button>
      ) : null}

      {showSidebar && (
        <Card style={sidebarStyle}>
          {isMobile && (
            <button onClick={closeSidebar} className="fixed top-4 right-4 z-50 p-2 bg-gray-100 rounded-md">
              {/* Close icon */}
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
            <h1 className="text-2xl font-semibold">My App</h1>
          </div>

          <div className={centerListStyle}>
            <List>
              <ListItem
                button
                component={Link}
                to="../pages/doctors"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <AccountBoxIcon className="mr-2" /> {/* Icon */}
                <ListItemText primary="Doctors" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/sidebar"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <AddBoxIcon className="mr-2" /> {/* Icon */}
                <ListItemText primary="Add Doctor" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/sidebar"
                className={`${listItemStyle} hover:${listItemHoverStyle} active:${listItemActiveStyle}`}
              >
                <DeleteIcon className="mr-2" /> {/* Icon */}
                <ListItemText primary="Delete Doctor" />
              </ListItem>
            </List>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
