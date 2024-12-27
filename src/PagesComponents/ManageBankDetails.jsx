import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Title from "../Containers/Title";

const ManageBankDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    merchant: "",
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
      <Title data={"Manage Bank Details"} />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleForm}
          sx={{ marginTop: 2 }}
        >
          + Add Bank Details
        </Button>
      </div>


      <Card>
        <CardHeader title="Merchant Id" />
        <CardContent>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            User Name
          </Typography>
        </CardContent>
      </Card>


      <Dialog open={showForm} onClose={toggleForm}>
        <DialogTitle>Add Bank Details</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />


            <TextField
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />


            <TextField
              label="Account Type"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />


            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />


            <TextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Address 1 */}
            <TextField
              label="Address 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />

            {/* Address 2 */}
            <TextField
              label="Address 2"
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

            {/* Merchant */}
            <TextField
              label="Merchant"
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={toggleForm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageBankDetails;
