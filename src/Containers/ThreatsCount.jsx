import { Box, Typography } from "@mui/material";
import React from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

const ThreatsCount = ({
  totalThreats,
  lowRisk,
  mediumLevelRisk,
  highLevelRisk,
  totalResolved,
  totalUnresolved,
  lowResolved,
  lowUnresolved,
  mediumResolved,
  mediumUnresolved,
  highResolved,
  highUnresolved,
}) => {
  const threatTypes = [
    {
      icon: CrisisAlertIcon,
      name: "Total Threats",
      count: totalThreats,
      resolvedCount: totalResolved,
      unresolvedCount: totalUnresolved,
    },
    {
      icon: CallReceivedIcon,
      name: "Low Level Threats",
      count: lowRisk,
      resolvedCount: lowResolved,
      unresolvedCount: lowUnresolved,
    },
    {
      icon: EqualizerIcon,
      name: "Medium Level Threats",
      count: mediumLevelRisk,
      resolvedCount: mediumResolved,
      unresolvedCount: mediumUnresolved,
    },
    {
      icon: ShowChartIcon,
      name: "High Level Threats",
      count: highLevelRisk,
      resolvedCount: highResolved,
      unresolvedCount: highUnresolved,
    },
  ];

  return (
    <Box
      className="threats-container"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "30px 10px",
        gap: 5, // Adds space between the items
        // flexWrap: "wrap",
        overflow: "auto",
        // Allows wrapping if the screen is small
      }}
    >
      {threatTypes.map((threat, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="threat-item"
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <Box className="icon" sx={{ marginRight: 1 }}>
              <threat.icon
                sx={{
                  color: "#ffffff",
                  fontSize: 20,
                  backgroundColor: "#1976d2",
                  borderRadius: "50%",
                  padding: 2,
                }}
              />
            </Box>

            <Box>
              <Typography
                className="total-count"
                sx={{ fontWeight: "bold", fontSize: 24, color: "#333" }}
              >
                {threat.count}
              </Typography>
            </Box>

            <Box
              className="severity"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                right: 0,
                left: 20,
              }}
            >
              <Typography
                className="resolved"
                sx={{ color: "#388e3c", fontWeight: "bold" }}
              >
                {threat.resolvedCount} Resolved
              </Typography>
              <Typography
                className="unresolved"
                sx={{ color: "#d32f2f", fontWeight: "bold" }}
              >
                {threat.unresolvedCount} Unresolved
              </Typography>
            </Box>
          </Box>
          <Typography
            className="name"
            sx={{
              color: "#00796b",
              position: "relative",
              fontWeight: "bold",
            }}
          >
            {threat.name}
          </Typography>
        </div>
      ))}
    </Box>
  );
};

export default ThreatsCount;
