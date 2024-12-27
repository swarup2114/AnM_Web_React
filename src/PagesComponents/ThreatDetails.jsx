import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CarouselData from "../Containers/Carousel";
import { useLocation } from "react-router-dom";
import { getUUID } from "../Utiles/uuid";
import FetchAllReportedThreats from "../Services/getAllReportedThreats";
import Title from "../Containers/Title";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ThreatDetails = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [threats, setThreats] = useState(null);
  const loading = useSelector((state) => state.newThreadSlice.loading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const location = useLocation();
  const { state } = location;
  const requestRepotedData = state?.requestData;

  useEffect(() => {
    if (!requestRepotedData) {
      console.error("No request data found.");
      return;
    }
    const fetchReportedThreats = async () => {
      try {
        const ReportedThreats = await FetchAllReportedThreats(
          requestRepotedData.threatId
        );
        setThreats(ReportedThreats);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchReportedThreats();
  }, [dispatch, requestRepotedData]);

  if (
    !threats ||
    !threats.threatReportList ||
    !Array.isArray(threats.threatReportList)
  ) {
    return <p>No details available for this threat.</p>;
  }
  if (loading) {
    return <Loading />;
  }

  const handleEyeIconClick = (item) => {
    let requestData = { reportId: item.id };
    localStorage.setItem(
      "Payload_for_fetchReportedThreatLog",
      JSON.stringify(requestData)
    );
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const currentThreats = threats.threatReportList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Title data="Threat Details" />
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 1 }} />
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowY: "auto",
          maxHeight: 400,
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: "rgb(54 48 73)",
              color: "white",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableRow sx={{ color: "white", position: "sticky" }}>
              <TableCell sx={{ color: "white" }}>
                <strong>Device Id</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>App Name</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>Package Id</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>Threshold Count</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>View</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentThreats.length > 0 ? (
              currentThreats.map((item, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{getUUID(item.mobileNumber) || "N/A"}</TableCell>
                  <TableCell>{item.appName || "N/A"}</TableCell>
                  <TableCell>{item.packageId || "N/A"}</TableCell>
                  <TableCell>{item.actualThresholdCount || "0"}</TableCell>
                  <TableCell sx={{ color: "rgb(124, 119, 245)" }}>
                    <VisibilityIcon onClick={() => handleEyeIconClick(item)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ textAlign: "center", padding: "10px" }}
                >
                  No Data Found...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        // rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={threats.threatReportList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // count={threats.threatReportList.length}
      />

      {isDrawerOpen && selectedItem && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <CarouselData setIsDrawerOpen={setIsDrawerOpen} />
        </Drawer>
      )}
    </div>
  );
};

export default ThreatDetails;
