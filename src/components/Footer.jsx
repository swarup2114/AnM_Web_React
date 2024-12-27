import React from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";
const Footer = () => {
  const usenav = useNavigate();
  const footerLinks = [
    { label: "Devices", route: "/DeviceUser" },
    { label: "Txn", route: "/Transactions" },
    { label: "Pin", route: "/Password" },
    { label: "Security", route: "/Security" },
    { label: "General", route: "/General" },
  ];

  const isBelow700px = useMediaQuery("(max-width:700px)");

  return (
    <>
      {isBelow700px && (
        <Box className="footer-container">
          <Box className="footer-link-container">
            {footerLinks.map((item, index) => (
              <Button
                key={index}
                className="footer-link-button"
                onClick={() => usenav(item.route)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Footer;
