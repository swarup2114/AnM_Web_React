import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PagenotFound = () => {
  const usenav = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop={10}
      textAlign="center"
    >
      <img
        src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png"
        alt="Page not found"
        width="200"
        height="200"
      />
      <Typography variant="h3" color="error" gutterBottom>
        Nothing here!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        The page requested does not exist.
      </Typography>
      <Button
        variant="text"
        color="primary"
        onClick={() => usenav("/DeviceUser")}
      >
        Take Me Home
      </Button>
    </Box>
  );
};

export default PagenotFound;
