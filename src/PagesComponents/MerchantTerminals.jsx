import React, { useEffect, useState } from "react";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import { useSelector, useDispatch } from "react-redux";
import { fetchTerminals } from "../reduxtoolkit/Slices/terminalSlice";
import Loading from "../components/Loading";
import { formatDate } from "../Utiles/dateFormat";
import { Box, Button, ButtonGroup } from "@mui/material"; 

const TerminalsComponent = () => {
  const { terminals, status, error } = useSelector((state) => state.terminals);
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("all"); 

  const merchantTerminalsData =
    terminals && terminals.filter((item) => item.terminalStatus !== null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTerminals());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }


  const filteredData =
    statusFilter === "all"
      ? merchantTerminalsData
      : merchantTerminalsData.filter(
          (terminal) =>
            terminal.terminalStatus.toUpperCase() === statusFilter.toUpperCase()
        )


  const sortedData = filteredData.sort((a, b) => a.id - b.id); 

  return (
    <div>
      <Title data={"Merchant Terminals"} />

 
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
          firstValue: terminal.id,
          secondValue: terminal.mobileNumber,
          thirdValue: terminal.terminalStatus.toUpperCase(),
          forthValue: formatDate(terminal.createdTimeStamp),
        }))}
        titles={["id", "Mobile Number", "Status", "Enrolled"]}
      />
    </div>
  );
};

export default TerminalsComponent;
