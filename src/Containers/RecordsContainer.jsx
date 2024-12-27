import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import WarningIcon from "@mui/icons-material/Warning";
// import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GppBadIcon from '@mui/icons-material/GppBad';
import PasswordIcon from '@mui/icons-material/Password';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UsbIcon from '@mui/icons-material/Usb';
import UsbOffIcon from '@mui/icons-material/UsbOff';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import SignalCellularConnectedNoInternet4BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet4Bar';
import SignalCellularNullIcon from '@mui/icons-material/SignalCellularNull';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PieChart from "./PieChart";
import { formatText } from "../Utiles/textFormat";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import "../styles/RecordsContainer.css"; // Import the external CSS

ChartJS.register(ArcElement, Tooltip, Legend);

const getIconBasedOnEvent = (event) => {
  switch (event) {
    case "TXN_CANCELLED":
      return <ErrorIcon />;
    case "TXN_SUCCESS":
      return <CloudDoneOutlinedIcon />;
    case "TXN_DECLINED":
      return <GppBadIcon />;
    case "TXN_PROCESS":
      return < HourglassTopIcon />;
    case "TXN_INITIATE":
      return <AssessmentIcon />
    // case "TXN_INITIATE":
    // case "TXN_PROCESS":
    // case "TXN_SUCCESS":
    // case "TXN_DECLINED":
    //   return <SettingsIcon />;
    case "TXN_USER_CANCELED":
      return <WarningIcon />;
    case "TXN_PIN_ENTRY":
      return <PasswordIcon />
    case "TXN_PIN_ENTRY_FAILED":
      return <CancelIcon />
    case "TXN_PIN_ENTRY_SUCCESS":
      return <DoneAllIcon />;
    case "USB_DEBUG_ON":
      return <UsbIcon />
    case "USB_DEBUG_OFF":
      return <UsbOffIcon />;
    case "ANDROID_VERSION_MISMATCH":
      return <SmsFailedIcon />;
    case "KERNEL_VERSION_MISMATCH":
      return <WarningIcon />;
    case "Tampered":
      return <WifiTetheringErrorIcon />;
    case "FRAUD":
      return <BugReportIcon />
    case "DEVICE_ROOTED":
      return <ErrorIcon />;
    case "APP_DEVELOPER_MODE_ON":
      return <CodeIcon />;
    case "APP_DEVELOPER_MODE_OFF":
      return <CodeOffIcon />;
    case "OTP":
      return <WarningIcon />;
    case "LOGOUT":
      return <LogoutIcon />
    case "LOGIN":
      return <LoginIcon />;
    case "DEVICE_UNREGISTER":
      return <PhonelinkEraseIcon />;
    case "DEVICE_REGISTRATION_SUCCESS":
      return <HowToRegIcon />
    case "ATTESTATION_MONITORING_REGISTER":
      return <SettingsIcon />;
    case "NETWORK_FAILURE":
      return <SignalCellularConnectedNoInternet4BarIcon />;
    case "NETWORK_DOWN_TIME":
      return <SignalCellularNullIcon />;
    case "OTP_ERROR":
      return <ErrorIcon />;
    case "CERTIFICATE_DOWNLOAD_FAILURE":
      return <SmsFailedIcon />;
    case "USB_CHARGING":
      return <BatteryCharging60Icon />;
    case "APP_SWITCH":
      return <SwapHorizontalCircleIcon />;
    default:
      return <MenuIcon />;
  }
};

const RecordsContainer = ({ data }) => {
  const loading = useSelector((state) => state.newThreadSlice.loading);
  if (loading) {
    return <Loading />; // Show a loading screen or spinner
  }
  return (
    <Box sx={{ padding: 3 }}>
      <Box className="record-container-wrapper record-container-custom">
        <Box className="record-container-card-container record-container-custom">
          {data.map((card, index) => (
            <Box key={index} className="record-card record-container-custom">
              <Card className="record-card-inner record-container-custom">
                <CardContent className="record-card-content record-container-custom">
                  <IconButton className="icon-button record-container-custom">
                    {getIconBasedOnEvent(card.event)}
                  </IconButton>
                  <Box className="record-text-container record-container-custom">
                    <Typography variant="h6" className="record-event record-container-custom">
                      {formatText(card.event)}
                    </Typography>
                    <Typography variant="body2" className="record-count record-container-custom">
                      Count: {card.count}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Box className="pie-chart-container record-container-custom">
          <PieChart data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default RecordsContainer;


