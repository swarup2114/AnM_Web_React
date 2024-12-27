import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Loading from "../components/Loading";
import dayjs from "dayjs";
import { formatText } from "../Utiles/textFormat";
import Title from "../Containers/Title";
import { useDispatch } from "react-redux";
import { MERCHANT_ID } from "../Redux/baseAPI";
import { setLoaded, setLoading } from "../Redux/newThreatSlice";
import FetchEventData from "../Services/eventSearch";
import { fetchEventsSearchSuccess } from "../Redux/newThreatSlice";
import { useEffect } from "react";

function EventSearch() {
  const loading = useSelector((state) => state.newThreadSlice.loading);
  const InitialData = useSelector((state) => state.newThreadSlice);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState(""); // For input text
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payload = {
    merchantId: MERCHANT_ID,
    dateFrom: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
    dateTo: "",
  };

  useEffect(() => {
    const fetchThreatsAndMerchants = async () => {
      console.log("code reached fetchThreatsAndMerchants block");
      try {
        dispatch(setLoading());
        const events = await FetchEventData(
          payload.merchantId,
          payload.dateFrom,
          payload.dateTo
        );
        console.log("code reached try block");
        dispatch(fetchEventsSearchSuccess(events));
        dispatch(setLoaded());
      } catch (error) {
        console.log("code reached error block");
        dispatch(setLoaded());
        console.error("Error fetching data:", error.message);
      }
    };
    fetchThreatsAndMerchants();
  }, [dispatch, selectedDate]);
  const handleDateChange = (newValue) => {
    if (newValue && newValue.isValid()) {
      setSelectedDate(newValue);
    }
  };

  const handleEventClick = (eventType) => {
    navigate(`/events/${eventType}`);
  };
  console.log(
    InitialData.eventSearhData,
    "InitialData.eventSearhData.eventCount"
  );

  const filteredData = (InitialData.eventSearhData?.eventCount ?? [])
    .filter((item) =>
      item.event.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => ({
      event: item.event || "N/A",
      count: item.count || 0,
    }))
    .sort((val1, val2) => val2.count - val1.count);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Title data="Event Search" />
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        paddingRight={5}
        paddingLeft={5}
        mt={2}
        gap={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            maxDate={dayjs()}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </LocalizationProvider>
      </Box>

      {InitialData.eventSearhData === null ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography variant="h6">
            No event data available for the selected date.
          </Typography>
        </Box>
      ) : filteredData.length > 0 ? (
        <Box
          mt={3}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
        >
          {filteredData.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: 270,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                padding: 2,
                cursor: "pointer",
              }}
              onClick={() => handleEventClick(item.event)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatText(item.event)}
                </Typography>
                <Typography variant="body1" mt={1}>
                  Count: {item.count}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography variant="h6">
            No event data available for the selected date.
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default EventSearch;
