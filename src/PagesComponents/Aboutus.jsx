import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Title from "../Containers/Title";

const AboutUs = () => {
  const cardData = {
    email: "info@inapayments.com",
    phone: "+91 6281381516",
    website: "https://www.inapayments.com",
  };

  return (
    <>
      <Title data={"About Us"} />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <Card
          sx={{
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <CardContent
            sx={{ backgroundColor: "#1976d2", color: "white", padding: "24px" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Contact Information
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              sx={{ marginBottom: "8px" }}
            >
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${cardData.email}`}
                style={{ color: "#ffeb3b", textDecoration: "none" }}
              >
                {cardData.email}
              </a>
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              sx={{ marginBottom: "8px" }}
            >
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${cardData.phone}`}
                style={{ color: "#ffeb3b", textDecoration: "none" }}
              >
                {cardData.phone}
              </a>
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              sx={{ marginBottom: "16px" }}
            >
              <strong>Website:</strong>{" "}
              <a
                href={cardData.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffeb3b", textDecoration: "none" }}
              >
                {cardData.website}
              </a>
            </Typography>
          </CardContent>
          <CardActions
            sx={{ justifyContent: "center", backgroundColor: "#1976d2" }}
          >
            <Button
              variant="outlined"
              size="small"
              href={`mailto:${cardData.email}`}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#ffeb3b",
                  backgroundColor: "#ffeb3b",
                  color: "#1976d2",
                },
                marginRight: 1,
              }}
            >
              Email Us
            </Button>
            <Button
              variant="outlined"
              size="small"
              href={cardData.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#ffeb3b",
                  backgroundColor: "#ffeb3b",
                  color: "#1976d2",
                },
              }}
            >
              Visit Website
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default AboutUs;
