import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function EventDataWrapper(category) {
  const [filteredData, setFilteredData] = useState([]);
  const FetchedData = useSelector((state) => state.newThreadSlice);
  console.log(FetchedData, "FetchedData");
  const eventsData = FetchedData.eventsData.eventCount;
  useEffect(() => {
    if (eventsData && category == "deviceUser") {
      const filtered = eventsData.filter(
        (event) =>
          event.event === "OTP" ||
          event.event === "LOGOUT" ||
          event.event === "APP_SWITCH" ||
          event.event === "LOGIN" ||
          event.event === "DEVICE_UNREGISTER" ||
          event.event === "DEVICE_REGISTRATION_SUCCESS" ||
          event.event === "ATTESTATION_MONITORING_REGISTER"
      );
      setFilteredData(filtered);
    } else if (eventsData && category == "general") {
      const filtered = eventsData.filter(
        (event) =>
          event.event === "NETWORK_FAILURE" ||
          event.event === "NETWORK_DOWN_TIME" ||
          event.event === "OTP_ERROR" ||
          event.event === "CERTIFICATE_DOWNLOAD_FAILURE"
      );
      setFilteredData(filtered);
    } else if (eventsData && category == "password") {
      const filtered = eventsData.filter(
        (event) =>
          event.event === "TXN_PIN_ENTRY" ||
          event.event === "TXN_PIN_ENTRY_FAILED" ||
          event.event === "TXN_PIN_ENTRY_SUCCESS"
      );
      setFilteredData(filtered);
    } else if (eventsData && category == "transactions") {
      const filtered = eventsData.filter(
        (event) =>
          event.event === "TXN_CANCELLED" ||
          event.event === "TXN_INITIATE" ||
          event.event === "TXN_PROCESS" ||
          event.event === "TXN_SUCCESS" ||
          event.event === "TXN_USER_CANCELED" ||
          event.event === "TXN_DECLINED"
      );
      setFilteredData(filtered);
    } else if (eventsData && category == "security") {
      const filtered = eventsData.filter(
        (event) =>
          event.event === "USB_DEBUG_ON" ||
          event.event === "USB_DEBUG_OFF" ||
          event.event === "ANDROID_VERSION_MISMATCH" ||
          event.event === "KERNEL_VERSION_MISMATCH" ||
          event.event === "Tampered" ||
          event.event === "APP_DEVELOPER_MODE_ON" ||
          event.event === "FRAUD" ||
          event.event === "USB_CHARGING" ||
          event.event === "DEVICE_ROOTED" ||
          event.event === "APP_DEVELOPER_MODE_OFF"
      );
      setFilteredData(filtered);
    }
  }, [eventsData]);
  return filteredData;
}
