import React, { useState } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Checkbox,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  
} from '@mui/material';
import Title from '../Containers/Title';

const ManageProcessors = () => {
  const [mode, setMode] = useState('test');
  const [dataEncryption, setDataEncryption] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle the opening and closing of the dialog
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleEncryptionChange = (event) => {
    setDataEncryption(event.target.checked);
  };

  return (
    <>
   <Title data={"Manage Processors"}/>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDialog}
          sx={{ marginTop: 2 }}
        >
          + Add Processor
        </Button>
      </div>

      {/* Dialog for Add Processor */}
      <Dialog open={openDialog} onClose={toggleDialog}>
        {/* <DialogTitle>Add Processor</DialogTitle> */}
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
              Add Processors
            </Typography>
            <TextField label="Processor Name" variant="outlined" fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Processor Code" variant="outlined" fullWidth />
              <TextField label="Currency" variant="outlined" fullWidth />
            </Box>
            <TextField label="Payment Method" variant="outlined" fullWidth />
            <TextField label="Transaction Type" variant="outlined" fullWidth />

            <Typography variant="subtitle1">Select Mode</Typography>
            <RadioGroup row value={mode} onChange={handleModeChange}>
              <FormControlLabel value="live" control={<Radio />} label="Live" />
              <FormControlLabel value="test" control={<Radio />} label="Test" />
            </RadioGroup>
            {mode === 'test' ? (
              <Typography color="primary">https://test.msp.inapayments.com</Typography>
            ) : (
              <Typography color="primary">https://live.msp.inapayments.com</Typography>
            )}

            <TextField
              label="Return URL"
              variant="outlined"
              defaultValue="https://status.msp.inapayments.com"
              fullWidth
            />
            <TextField
              label="DCC URL"
              variant="outlined"
              defaultValue="https://dcc.msp.inapayments.com"
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={dataEncryption}
                  onChange={handleEncryptionChange}
                />
              }
              label="Required Data Encryption?"
            />

            <Button variant="contained" color="primary" size="large">
              Add
            </Button>
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

export default ManageProcessors;
