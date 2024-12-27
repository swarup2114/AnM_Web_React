import React, { useState, useEffect } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import StyledTable from "../Containers/Table";
import { getUUID } from "../Utiles/uuid";
import { formatDate } from "../Utiles/dateFormat";
import Loading from "../components/Loading";
import Title from "../Containers/Title";
import { useSelector, useDispatch } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { fetchReportedThreatLogSuccess } from "../Redux/newThreatSlice";

const ThreatsHandling = () => {
  const dispatch = useDispatch();
  const ReduxData = useSelector((state) => state.newThreadSlice);
  const loading = useSelector((state) => state.newThreadSlice.loading);

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    threatId: "",
    mobileNumber: "",
    alertType: "USER",
    acknowledgmentForMitigate: {
      referenceId: "",
      referenceName: "",
      acknowledgement: "",
    },
  });

  const [mitigateError, setMitigateError] = useState("");

  const tableData = ReduxData.unResolvedThreats.map((device) => ({
    deviceId: getUUID(device.mobileNumber),
    osVersion: device.osVersion,
    appName: device.appName,
    bundleId: device.packageId,
    riskLevel: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <CircleIcon
          sx={{
            color:
              device.threatSeverity === "HIGH"
                ? "red"
                : device.threatSeverity === "MEDIUM"
                ? "orange"
                : "green",
            fontSize: "15px",
            marginRight: "5px",
          }}
        />
        {device.threatSeverity}
      </span>
    ),
    createdTime: formatDate(device.createdTime),
    icon: (
      <LockResetIcon
        sx={{ color: "rgb(124, 119, 245)" }}
        onClick={() => handleOpenModal(device.mobileNumber, device.deviceId)}
      />
    ),
  }));

  const tableColumns = [
    "Device Id",
    "OS",
    "App Name",
    "Bundle Id",
    "Severity",
    "Reported",
    "Mitigate",
  ];

  const handleOpenModal = (mobileNumber, threatId) => {
    setFormData((prevState) => ({
      ...prevState,
      threatId,
      mobileNumber,
    }));
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      acknowledgmentForMitigate: {
        ...prevState.acknowledgmentForMitigate,
        [name]: value,
      },
    }));
  };

  const handleAlertTypeChange = (event) => {
    const selectedAlertType = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      alertType: selectedAlertType,
    }));
  };

  const handleSubmit = async () => {
    const { alertType, acknowledgmentForMitigate } = formData;
    const { referenceId, referenceName, acknowledgement } =
      acknowledgmentForMitigate;

    if (
      !alertType ||
      !referenceId.trim() ||
      !referenceName.trim() ||
      !acknowledgement.trim()
    ) {
      setMitigateError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      // Mocking the mitigation action
      // Here, you would dispatch an action to update the mitigation status of the threat
      const requestData = { ...formData };
      console.log("Mitigating threat with data:", requestData);

      // Assuming the mitigation is successful, we would dispatch to fetch updated data.
      const response = await fetchThreatReports(); // Make sure to fetch updated threat reports
      dispatch(fetchReportedThreatLogSuccess(response));

      setIsLoading(false);
      setModalOpen(false);
    } catch (error) {
      console.error("Error during mitigation:", error);
      setIsLoading(false);
    }
  };

  // Simulate fetching the updated threat data after mitigation
  const fetchThreatReports = async () => {
    // Simulate API call to fetch updated reports
    const response = {
      threatReportList: ReduxData.unResolvedThreats.filter(
        (threat) => threat.threatId !== formData.threatId
      ),
    };
    return response;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Title data="Unresolved Threats" />
      {ReduxData.unResolvedThreats.length === 0 ? (
        <p>No unresolved threats found.</p>
      ) : (
        <StyledTable data={tableData} titles={tableColumns} />
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Mitigate Threat</h2>
          <RadioGroup
            name="alertType"
            value={formData.alertType}
            onChange={handleAlertTypeChange}
            row
          >
            <FormControlLabel value="USER" control={<Radio />} label="User" />
            <FormControlLabel
              value="MERCHANT"
              control={<Radio />}
              label="Merchant"
            />
          </RadioGroup>
          <TextField
            label="Reference ID"
            name="referenceId"
            value={formData.acknowledgmentForMitigate.referenceId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Reference Name"
            name="referenceName"
            value={formData.acknowledgmentForMitigate.referenceName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Acknowledgement"
            name="acknowledgement"
            value={formData.acknowledgmentForMitigate.acknowledgement}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            error={!!mitigateError}
            helperText={mitigateError}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isLoading ? (
              <CircularProgress
                size={24}
                color="inherit"
                sx={{ marginTop: 1 }}
              />
            ) : (
              "Mitigate"
            )}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ThreatsHandling;
