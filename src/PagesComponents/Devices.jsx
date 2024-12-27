import React, { useState, useEffect } from "react";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { formatDate } from "../Utiles/dateFormat";
import { Box, Button, ButtonGroup } from "@mui/material";
import { getUUID } from "../Utiles/uuid";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const Devices = () => {
  const ReduxData = useSelector((state) => state.newThreadSlice);
  const [statusFilter, setStatusFilter] = useState("all");

  const merchantTerminalsData =
    ReduxData.terminals &&
    ReduxData.terminals.filter((item) => item.terminalStatus !== null);

  const loading = useSelector((state) => state.newThreadSlice.loading);
  const filteredData =
    statusFilter === "all"
      ? merchantTerminalsData
      : merchantTerminalsData.filter(
          (terminal) =>
            terminal.terminalStatus.toUpperCase() === statusFilter.toUpperCase()
        );

  const sortedData = filteredData.sort((a, b) => a.id - b.id);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Title data="Device Management" />

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}>
        <ButtonGroup variant="contained" aria-label="status filter">
          <Button
            onClick={() => setStatusFilter("all")}
            color={statusFilter === "all" ? "primary" : "default"}
          >
            All
          </Button>
          <Button
            onClick={() => setStatusFilter("active")}
            color={statusFilter === "active" ? "primary" : "default"}
          >
            Active
          </Button>
          <Button
            onClick={() => setStatusFilter("inactive")}
            color={statusFilter === "inactive" ? "primary" : "default"}
          >
            Inactive
          </Button>
        </ButtonGroup>
      </Box>

      <StyledTable
        data={sortedData.map((terminal) => ({
          deviceId: getUUID(terminal.mobileNumber),
          osType: terminal.osVersion,
          status: terminal.terminalStatus.toUpperCase(),
          forthValue: formatDate(terminal.createdTimeStamp),
          icon: <ToggleOnIcon sx={{ color: "rgb(255 69 0)", fontSize: 30 }} />,
        }))}
        titles={[
          "Device Id",
          "OS ",
          "Status",
          "Enrolled Date",
          "Block/Unblock",
        ]}
        align="left"
      />
    </div>
  );
};

export default Devices;
