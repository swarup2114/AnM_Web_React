import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Title from "../Containers/Title";
const ProcessorRules = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rulesName: "",
    transactionType: "",
    bin: "",
    velocity: "",
    threshold: "",
  });
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
        <Title data={"     Processor Rules"} />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleForm}
          sx={{ marginTop: 2 }}
        >
          + Add Processor
        </Button>
      </div>
      <Dialog open={showForm} onClose={toggleForm}>
        <DialogTitle>Processor Rules</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Rules Name"
              name="rulesName"
              value={formData.rulesName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Transaction Type"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Bin  "
              name="bin"
              value={formData.bin}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Velocity  "
              name="velocity"
              value={formData.velocity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Threshold  "
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <div style={{ display: "flex", justifyContent: "end" }}>
              {" "}
              <Button variant="contained">Add</Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm} color="secondary">
            Cancel
          </Button>
          {/* <Button onClick={toggleForm} color="primary">
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProcessorRules;
