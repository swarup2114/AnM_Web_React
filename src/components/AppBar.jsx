import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useMediaQuery,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Person4Icon from "@mui/icons-material/Person4";
import { useDispatch } from "react-redux";
import "../styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCardOpen, setIsCardOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");

  const handleUserIconClick = () => {
    setIsCardOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Device Users", route: "/DeviceUser" },
    { label: "Transactions", route: "/Transactions" },
    { label: "Pin", route: "/Password" },
    { label: "Security", route: "/Security" },
    { label: "General", route: "/General" },
  ];

  return (
    <AppBar position="sticky" className="header-appBar header-custom">
      <Toolbar className="header-toolbar header-custom">
        {!isMobile && (
          <Box className="header-box header-custom">
            {menuItems.map((item, index) => (
              <NavLink
                to={item.route}
                key={index}
                className={({ isActive }) =>
                  `header-navLink header-custom ${
                    isActive ? "header-navLinkActive header-custom" : ""
                  }`
                }
              >
                <Button
                  className="header-menuButton header-custom"
                  color="inherit"
                >
                  {item.label}
                </Button>
              </NavLink>
            ))}
            <IconButton
              onClick={handleUserIconClick}
              color="inherit"
              className="header-iconButton header-custom"
            >
              <Person4Icon className="header-personIcon header-custom" />
            </IconButton>
            {isCardOpen && (
              <Card className="header-card header-custom">
                <CardContent className="header-cardContent header-custom">
                  <Typography>User Name</Typography>
                  <Button fullWidth color="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </CardContent>
              </Card>
            )}
            {isCardOpen && (
              <Card
                sx={{
                  position: "absolute",
                  top: "60px", // Adjusting position from top
                  right: "10px", // Adjusting position from right
                  width: "200px", // Adjusted width for better spacing
                  boxShadow: 5, // Stronger shadow for a "pop-out" effect
                  borderRadius: 2, // Slightly rounded corners
                  backgroundColor: "#ffffff", // Ensures a white background
                  border: "1px solid #e0e0e0", // Light border for separation
                  zIndex: 10, // Keeps it above other elements
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: 2, // Padding inside the card
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1, // Spacing below the name
                    }}
                  >
                    Sandeep Mukku
                  </Typography>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      textTransform: "none", // Avoid uppercase text
                      fontWeight: "bold",
                      backgroundColor: "#1976d2", // Material-UI primary color
                      "&:hover": {
                        backgroundColor: "#1565c0", // Darker shade on hover
                      },
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
        {/* Mobile view */}
        {isMobile && (
          <Box className="header-mobileBox header-custom">
            <Box className="header-mobileIconBox header-custom">
              <IconButton
                onClick={handleUserIconClick}
                color="inherit"
                className="header-iconButton header-custom"
              >
                <Person4Icon sx={{ fontSize: 20, color: "#0b4465" }} />
              </IconButton>
            </Box>
            {isCardOpen && (
              <Card className="header-mobileCard header-custom">
                <CardContent className="header-cardContent header-custom">
                  <Typography>User Name</Typography>
                  <Button fullWidth color="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
