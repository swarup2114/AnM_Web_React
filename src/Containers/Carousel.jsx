import React, { useState, useEffect } from "react";
import {
  Drawer,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import FetchAllReportedThreatLogs from "../Services/getAllReportedThreatLogs";
import { fetchReportedThreatLogSuccess } from "../Redux/newThreatSlice";
function CarouselData({ setIsDrawerOpen }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [threatReports, setThreatReports] = useState([]);
  const [alertType, setAlertType] = useState("USER");
  const [mitigateError, setMitigateError] = useState("");
  const [formData, setFormData] = useState({
    alertType: "USER",
    acknowledgmentForMitigate: {
      referenceId: "",
      referenceName: "",
      acknowledgement: "",
    },
  });

  const ReduxData = useSelector((state) => state.newThreadSlice)

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("Payload_for_fetchReportedThreatLog")
    );
    const fetchThreatReportedLogs = async () => {
      try {
        const response = await FetchAllReportedThreatLogs(storedData.reportId)
        dispatch(fetchReportedThreatLogSuccess(response.threatReportList))
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (storedData) {
      // dispatch(fetchReportedThreatLog(storedData));
      fetchThreatReportedLogs()
    }
  }, [dispatch]);

  useEffect(() => {
    if (ReduxData.threadReportedLogs) {
      setThreatReports(ReduxData.threadReportedLogs);
    }
  }, [ReduxData]);

  const handleAlertTypeChange = (event) => {
    const selectedAlertType = event.target.value;
    setAlertType(selectedAlertType);
    setFormData((prevState) => ({
      ...prevState,
      alertType: selectedAlertType,
    }));
  };

  const handleOpenModal = (mobileNumber, threatId) => {
    setFormData((prevState) => ({
      ...prevState,
      acknowledgmentForMitigate: {
        ...prevState.acknowledgmentForMitigate,
      },
      threatId,
      mobileNumber,
    }));
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (["referenceId", "referenceName", "acknowledgement"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        acknowledgmentForMitigate: {
          ...prevState.acknowledgmentForMitigate,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = () => {
    // Validate form fields
    const { alertType, acknowledgmentForMitigate } = formData;
    const { referenceId, referenceName, acknowledgement } =
      acknowledgmentForMitigate;

    if (
      !alertType ||
      !referenceId.trim() ||
      !referenceName.trim() ||
      !acknowledgement.trim()
    ) {
      setMitigateError("All Fields Required");
      setMitigateError("All Fields Required");
      return; // Exit the function early
    }

    const requestData = { ...formData };
    setIsLoading(true);

    // Dispatch the mitigation action
    // dispatch(mitigateThreat(requestData))
    //   .then((response) => {
    //     // Get the updated threat reports immediately after the mitigation is successful
    //     const storedData = JSON.parse(
    //       localStorage.getItem("Payload_for_fetchReportedThreatLog")
    //     );


    //     dispatch(fetchReportedThreatLog(storedData)).then((fetchResponse) => {
    //       if (fetchResponse.payload?.threatReportList) {
    //         setThreatReports(fetchResponse.payload.threatReportList); // Update state directly
    //       }
    //       setIsLoading(false);
    //     });

    //     setModalOpen(false); // Close the modal
    //   })
    //   .catch((error) => {
    //     console.error("Error in mitigating threat:", error);
    //   });
  };

  return (
    <div>
      <Drawer anchor="right" open={true} onClose={handleCloseDrawer}>
        <div style={{ width: 350, padding: 20 }}>
          <h1>Threat Reports</h1>

          {threatReports?.length > 0 ? (
            threatReports.map((item) => (
              <Card
                key={item.id}
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "1.1rem",
                    }}
                  >
                    Threat ID: {item.threatId}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginBottom: "5px", color: "#555" }}
                  >
                    <strong>Mobile Number:</strong> {item.mobileNumber}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginBottom: "5px", color: "#555" }}
                  >
                    <strong>App Name:</strong> {item.appName}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginBottom: "5px", color: "#555" }}
                  >
                    <strong>Reported Date:</strong>{" "}
                    {new Date(item.reportedDate).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      marginBottom: "5px",
                      color:
                        item.threatSeverity === "High"
                          ? "#e74c3c"
                          : item.threatSeverity === "Medium"
                            ? "#f39c12"
                            : "#2ecc71",
                    }}
                  >
                    <strong>Threat Severity:</strong> {item.threatSeverity}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginBottom: "5px", color: "#555" }}
                  >
                    <strong>Mitigate Type:</strong> {item.mitigateType}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color:
                        item.mitigateStatus === "Resolved"
                          ? "#2ecc71"
                          : "#f39c12",
                    }}
                  >
                    <strong>Mitigate Status:</strong> {item.mitigateStatus}
                  </Typography>
                  {item.mitigateStatus !== "RESOLVED" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleOpenModal(item.mobileNumber, item.threatId)
                      }
                      sx={{ marginTop: 2 }}
                    >
                      Mitigate
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              No threat reports available.
            </Typography>
          )}
        </div>

        {/* <Modal open={modalOpen} onClose={handleCloseModal}>
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
              value={alertType}
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
                  // sx={{ position: "absolute" }}
                  sx={{ marginTop: 1 }}
                />
              ) : (
                "Mitigate"
              )}
            </Button>
          </Box>
        </Modal> */}
      </Drawer>
    </div>
  );
}

export default CarouselData;
