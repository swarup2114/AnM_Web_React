import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Box } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import Loading from "../components/Loading";
import { formatText } from "../Utiles/textFormat";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { formatDate } from "../Utiles/dateFormat";
import updateThreatStatus from "../Services/updateThreatStatus";
import FetchAllThreats from "../Services/getAllThreats";
import { fetchThreatsSuccess } from "../Redux/newThreatSlice";
import CircleIcon from "@mui/icons-material/Circle";

const ThreatList = () => {
  const dispatch = useDispatch();
  const ReduxData = useSelector((state) => state.newThreadSlice);
  const loading = useSelector((state) => state.newThreadSlice.loading);
  const [riskLevelFilter, setRiskLevelFilter] = useState("All");
  const handleAction = async (threatId, enabled) => {
    try {
      const events = await updateThreatStatus(threatId, enabled);
      if (events.responseCode == 200) {
        const threats = await FetchAllThreats();
        dispatch(fetchThreatsSuccess(threats.threatsResponseList));
      }
    } catch (error) {
      console.error("Error updating threat status:", error);
    }
  };
  const filteredData = ReduxData.threatsData
    .map((item) => {
      // Extract threatSeverity as a plain value
      const severity = item?.threatSeverity ?? "Unknown";

      return {
        secondValue: formatText(item?.threatId ?? null),
        thirdValue: item?.threatDescription ?? null,
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
                  severity === "HIGH"
                    ? "red"
                    : severity === "MEDIUM"
                    ? "orange"
                    : "green",
                fontSize: "15px",
                marginRight: "5px",
              }}
            />
            {severity}
          </span>
        ),
        fourthValue: item?.threatGroupType ?? "Unknown",
        maxThreshCount: item?.threshold,
        updateTime: formatDate(item?.updatedTime),
        action: item?.enabled ? (
          <ToggleOnIcon
            sx={{ color: "orangered", cursor: "pointer", fontSize: 30 }}
            onClick={() => handleAction(item.threatId, !item.enabled)}
          />
        ) : (
          <ToggleOffIcon
            sx={{ cursor: "pointer", fontSize: 30 }}
            onClick={() => handleAction(item.threatId, !item.enabled)}
          />
        ),
        severity, // Store the severity value to use in the filter
      };
    })
    .filter(
      (item) =>
        riskLevelFilter === "All" ||
        item.severity.toLowerCase() === riskLevelFilter.toLowerCase()
    );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title data={"Threats List"} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <ButtonGroup variant="contained" aria-label="risk level filter">
          {["All", "Low", "Medium", "High"].map((level) => (
            <Button
              key={level}
              onClick={() => setRiskLevelFilter(level)}
              color={riskLevelFilter === level ? "primary" : "default"}
            >
              {level}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {filteredData.length > 0 ? (
        <StyledTable
          data={filteredData}
          titles={[
            "Threat Name",
            "Threat Description",
            "Severity",
            "Group",
            "Max Thresh Count",
            "Reported",
            "Enable/Disable",
          ]}
        />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default ThreatList;
