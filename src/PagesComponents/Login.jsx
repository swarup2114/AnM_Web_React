import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { yellow, grey } from "@mui/material/colors";
import Login from "../assests/Login.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mobileNumber == "9988776655" && password == "1234") {
      const user = { mobileNumber };
      navigate("/DeviceUser");
    } else {
      setErrorText("Invalid mobile number or password. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${Login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: isSmallScreen ? "center" : "flex-end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          marginRight: isSmallScreen ? 0 : "100px",
          marginLeft: isSmallScreen ? 0 : "auto",
          borderRadius: 2,
          backgroundColor: "transparent",
          boxShadow: 3,
          zIndex: 1,
        }}
      >
        <CardContent>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ marginBottom: 2, color: "white" }}
          >
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Enter Mobile Number"
              value={mobileNumber}
              inputProps={{ maxLength: 10 }}
              onChange={(e) => setMobileNumber(e.target.value)}
              autoComplete="mobileNumber"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: yellow[500],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: yellow[500],
                  },
                  "& input": {
                    "&:focus": {
                      color: yellow[500],
                    },
                  },
                },
                "& label": {
                  color: yellow[500],
                  fontSize: "1rem",
                  fontWeight: "bold",
                },
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Enter Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: yellow[500],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: yellow[500],
                  },
                  "& input": {
                    "&:focus": {
                      color: yellow[500],
                    },
                  },
                },
                "& label": {
                  color: yellow[500],
                  fontSize: "1rem",
                  fontWeight: "bold",
                },
              }}
            />
            {errorText && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  marginTop: 1,
                }}
              >
                {errorText}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#00aff4",
              }}
            >
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
