import { Box, Typography } from "@mui/material";
import React from "react";

const Title = ({ data }) => {
  return (
    <Box
      sx={{ backgroundColor: "#0b4465", p: 1, color: "white", borderRadius: 1 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {data}
      </Typography>
    </Box>
  );
};

export default Title;
