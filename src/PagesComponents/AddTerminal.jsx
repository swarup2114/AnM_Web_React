import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import Title from "../Containers/Title";
const AddTerminal = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <Title data={"Add Terminal"} />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDialog}
          sx={{ marginTop: 2 }}
        >
          + Add Terminal
        </Button>
      </div>


      <Dialog
        open={openDialog}
        onClose={toggleDialog}
        fullWidth
        maxWidth="sm"
      >

        <DialogContent>
          <Box
            sx={{
              maxWidth: 600,
              margin: '0 auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Add Terminal
            </Typography>
            <TextField label="User id " variant="outlined" fullWidth />
            <TextField label="App Version" variant="outlined" fullWidth />
            <TextField label="OS version" variant="outlined" fullWidth />

            <div style={{ display: "flex", justifyContent: "end" }}>
              {" "}
              <Button variant="contained">          Next</Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTerminal;
