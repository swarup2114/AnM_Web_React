import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledTable from "./Table";
import { formatDate } from "../Utiles/dateFormat";
import { formatText } from "../Utiles/textFormat";
import Loading from "../components/Loading";
function EventDetail() {
  const { eventType } = useParams();
  const InitialData = useSelector((state) => state.newThreadSlice)
  const loading = useSelector((state) => state.newThreadSlice.loading);
  const filteredEvents = (InitialData?.eventSearhData.events || []).filter(
    (event) => event.eventType === eventType
  );
  if (loading) {
    return <Loading />;
  }

  return (
    <StyledTable
      data={filteredEvents.map((terminal) => ({
        deviceId: terminal.deviceId,
        osType: terminal.osVersion,
        appName: "SPOS",
        bundleId: "ina.ams",

        reported: formatDate(terminal.createdTs),
        eventName: formatText(terminal.eventType),
        description: terminal.description ? terminal.description : "_",
      }))}
      titles={[
        "Device Id",
        "OS ",
        "App Name",
        "Bundle Id",
        "Reported",
        "Event Name",
        "Event Description",
      ]}
    />
  );
}

export default EventDetail;
