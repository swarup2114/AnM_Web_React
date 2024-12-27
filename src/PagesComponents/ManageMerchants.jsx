import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import Title from "../Containers/Title";

const ManageMerchants = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    businessDBAName: "",
    businessLegalName: "",
    nationalTaxId: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    merchantCategoryCode: "",
  });

  // Handle the opening and closing of the modal
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Title data={"Manage Merchants"} />

      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleForm}
          sx={{ marginTop: 2 }}
        >
          + Add Merchant
        </Button>
      </div>

      {/* Card to display Merchant Details */}
      <Card>
        <CardHeader title="Merchant Id" />
        <CardContent>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            User Name
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for Adding Merchant Details */}
      <Dialog open={showForm} onClose={toggleForm}>
        <DialogTitle>Add Merchant Details</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            {/* Business DBA Name */}
            <TextField
              label="Business(DBA) Name"
              name="businessDBAName"
              value={formData.businessDBAName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Business Legal Name */}
            <TextField
              label="Business(Legal) Name"
              name="businessLegalName"
              value={formData.businessLegalName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* National Tax Id */}
            <TextField
              label="National Tax Id"
              name="nationalTaxId"
              value={formData.nationalTaxId}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Address Line 1 */}
            <TextField
              label="Address Line 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Address Line 2 */}
            <TextField
              label="Address Line 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Country */}
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* State */}
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* City */}
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Pincode */}
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Merchant Category Code */}
            <TextField
              label="Merchant Category Code"
              name="merchantCategoryCode"
              value={formData.merchantCategoryCode}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "end" }}>
              {" "}
              <Button variant="contained">Next</Button>
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

export default ManageMerchants;
