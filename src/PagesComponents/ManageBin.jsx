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
const ManageBin = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    binId: "",
    binLowRange: "",
    binHighRange: "",
    binApplyData: "",
  });
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>  <Title data={"      Manage Bin"} />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleForm}
          sx={{ marginTop: 2 }}
        >
          + Add Bin
        </Button>
      </div>
      <Dialog open={showForm} onClose={toggleForm}>
        <DialogTitle>Add Merchant Details</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Pin Id"
              name="binId"
              value={formData.binId}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Bin Low Range"
              name="binLowRange"
              value={formData.binLowRange}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Bin High Range "
              name="binHighRange"
              value={formData.binHighRange}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="Bin Apply Date"
              name="binApplyData"
              value={formData.binApplyData}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
              type="date" // Date field
              InputLabelProps={{
                shrink: true, // Ensure the label stays above the input field
              }}
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

export default ManageBin;
