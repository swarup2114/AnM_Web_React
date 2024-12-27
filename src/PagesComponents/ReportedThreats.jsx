import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../Utiles/dateFormat";
import { formatText } from "../Utiles/textFormat";
import ThreatsCount from "../Containers/ThreatsCount";
import { getUUID } from "../Utiles/uuid";
import Title from "../Containers/Title";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StyledTable from "../Containers/Table";
import BasicLineChart from "../Containers/LineChart";
import Loading from "../components/Loading";

const ThreatsReported = () => {
  const ReduxData = useSelector((state) => state.newThreadSlice);
  const [timeFilter, setTimeFilter] = useState("all");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const loading = useSelector((state) => state.newThreadSlice.loading);

  const filterDataByTime = (data, timeFilter, fromDate, toDate) => {
    const now = new Date();

    return data.filter((item) => {
      const updatedTime = new Date(item.updatedTime);

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return updatedTime >= from && updatedTime <= to;
      }

      switch (timeFilter) {
        case "1hr":
          const oneHourAgo = new Date();
          oneHourAgo.setHours(now.getHours() - 1);
          return updatedTime >= oneHourAgo;

        case "1day":
          const startOfYesterday = new Date();
          startOfYesterday.setDate(now.getDate() - 1);
          startOfYesterday.setHours(0, 0, 0, 0);

          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);
          return updatedTime >= startOfYesterday && updatedTime <= endOfToday;

        case "1week":
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return updatedTime >= oneWeekAgo;

        case "1month":
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return updatedTime >= oneMonthAgo;

        case "3months":
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          return updatedTime >= threeMonthsAgo;

        case "all":
        default:
          return true;
      }
    });
  };

  const handleDateChange = (date, type) => {
    if (type === "from") {
      setFromDate(date);
    } else {
      setToDate(date);
    }
  };

  const filteredData = filterDataByTime(
    ReduxData.DeviceThreats || [],
    timeFilter,
    fromDate,
    toDate
  ).map((item) => ({
    id: getUUID(item.mobileNumber),
    Status: item.resolved.toString() === "true" ? "Fixed" : "Pending",
    severity: (
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        <CircleIcon
          sx={{
            color:
              item.threatSeverity === "HIGH"
                ? "red"
                : item.threatSeverity === "MEDIUM"
                ? "orange"
                : "green",
            fontSize: "15px",
            marginRight: "5px",
          }}
        />
        {item.threatSeverity}
      </span>
    ),
    threat_Name: formatText(item.threatId),
    package_ID: item.packageId,
    appName: item.appName,
    osVersion: item.osVersion,
    count: item.reportedThresholdCount,
    maxCount: item.actualThresholdCount,
    issued_Date: formatDate(item.updatedTime),
  }));

  const groupedThreats = filteredData.reduce(
    (acc, item) => {
      const severity = item.severity.props.children[1].toLowerCase();

      if (!acc[severity]) {
        acc[severity] = {
          threats: [],
          resolvedCount: 0,
          unresolvedCount: 0,
        };
      }

      acc[severity].threats.push(item);

      if (item.Status === "Fixed") {
        acc[severity].resolvedCount++;
      } else {
        acc[severity].unresolvedCount++;
      }

      acc.allThreats.push(item);

      if (item.Status === "Fixed") {
        acc.allResolvedCount++;
      } else {
        acc.allUnresolvedCount++;
      }

      return acc;
    },
    {
      low: { threats: [], resolvedCount: 0, unresolvedCount: 0 },
      medium: { threats: [], resolvedCount: 0, unresolvedCount: 0 },
      high: { threats: [], resolvedCount: 0, unresolvedCount: 0 },
      allThreats: [],
      allResolvedCount: 0,
      allUnresolvedCount: 0,
    }
  );

  const {
    low,
    medium,
    high,
    allThreats,
    allResolvedCount,
    allUnresolvedCount,
  } = groupedThreats;

  const handleReset = () => {
    setTimeFilter("all");
    setFromDate(null);
    setToDate(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title data={"Threats"} />
      <ThreatsCount
        totalThreats={allThreats.length}
        totalResolved={allResolvedCount}
        totalUnresolved={allUnresolvedCount}
        lowRisk={low.threats.length}
        mediumLevelRisk={medium.threats.length}
        highLevelRisk={high.threats.length}
        lowResolved={low.resolvedCount}
        lowUnresolved={low.unresolvedCount}
        mediumResolved={medium.resolvedCount}
        mediumUnresolved={medium.unresolvedCount}
        highResolved={high.resolvedCount}
        highUnresolved={high.unresolvedCount}
      />
      <BasicLineChart />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "end",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl sx={{ border: "none" }}>
              <Select
                labelId="timeFilter-label"
                value={timeFilter}
                onChange={(e) => {
                  setFromDate(null);
                  setToDate(null);
                  setTimeFilter(e.target.value);
                }}
                sx={{
                  width: 250,
                  height: 30,
                  border: "none !important",
                  textAlign: "center",
                  display: "flex",
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="1hr">Last 1 Hour</MenuItem>
                <MenuItem value="1day">Last 1 Day</MenuItem>
                <MenuItem value="1week">Last 1 Week</MenuItem>
                <MenuItem value="1month">Last 1 Month</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={handleReset}
              size="small"
              sx={{ marginRight: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {timeFilter === "custom" && (
          <Box sx={{ marginTop: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "end" }}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(date) => handleDateChange(date, "from")}
                  textField={{ fullWidth: true, size: "small" }}
                />
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(date) => handleDateChange(date, "to")}
                  textField={{ fullWidth: true, size: "small" }}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        )}
      </Box>
      {filteredData.length > 0 ? (
        <StyledTable
          data={filteredData}
          titles={[
            "Device ID",
            "Status",
            "Severity",
            "Threat Name",
            "Package ID",
            "App Name",
            "OS Version",
            "Reported Threshold",
            "Max Threshold",
            "Reported Date",
          ]}
        />
      ) : (
        <Typography style={{ textAlign: "center" }}>
          No data available
        </Typography>
      )}
    </>
  );
};

export default ThreatsReported;
