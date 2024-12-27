import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Pagination,
  Stack,
  Popover,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const StyledTable = ({ data, titles, align = "center" }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visibleColumns, setVisibleColumns] = useState(
    titles.reduce((acc, title) => {
      acc[title] = true; // All columns are visible by default
      return acc;
    }, {})
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnVisibilityChange = (event) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleFilterIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5; // Maximum visible page numbers (i.e., the buttons)
    const startPage = Math.max(page - Math.floor(maxDisplayedPages / 2), 0);
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages - 1);

    if (startPage > 0) {
      pageNumbers.push(1);
      if (startPage > 1) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i + 1);
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box sx={{ marginTop: 2 }}>
        {/* Filter Icon */}
        <IconButton
          onClick={handleFilterIconClick}
          aria-label="filter"
          sx={{ marginLeft: 1 }}
        >
          <FilterListIcon />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ zIndex: 1000 }}
        >
          <Box sx={{ padding: 2, width: 250 }}>
            <Typography variant="h6" gutterBottom>
              Select Columns to Display:
            </Typography>
            {titles.map((header) => (
              <FormControlLabel
                key={header}
                control={
                  <Checkbox
                    checked={visibleColumns[header]}
                    onChange={handleColumnVisibilityChange}
                    name={header}
                    color="primary"
                  />
                }
                label={header.charAt(0).toUpperCase() + header.slice(1)}
              />
            ))}
          </Box>
        </Popover>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: 500,
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#363049",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                {titles.map(
                  (header) =>
                    visibleColumns[header] && (
                      <TableCell
                        key={header}
                        sx={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                          padding: "12px",
                          whiteSpace: "nowrap",
                          minWidth: 50,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  {Object.entries(row).map(([key, value], colIndex) => {
                    const columnTitle = titles[colIndex];
                    return (
                      visibleColumns[columnTitle] && (
                        <TableCell
                          key={colIndex}
                          sx={{
                            padding: "12px",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            maxWidth: 250,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value === null ? "-" : value}
                        </TableCell>
                      )
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            padding: 2,
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e3ebf5",
            borderBottom: "1px solid #e3ebf5",
          }}
        >
          {/* Previous Button */}
          <Button
            sx={{
              borderRight: "2px solid rgb(0, 0, 0)",
              borderRadius: 0,
              color: "black",
              fontWeight: "bold",
            }}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            <KeyboardBackspaceIcon /> Prev
          </Button>

          {/* Total Records Count */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Typography variant="body2">Total: {data.length}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "row", marginRight: 0 }}
              >
                {generatePageNumbers().map((pageNumber, index) => (
                  <Typography
                    key={index}
                    variant="subtitle1"
                    color={pageNumber === page + 1 ? "primary" : "default"}
                    disabled={pageNumber === "..." || pageNumber === page + 1}
                    onClick={() =>
                      pageNumber !== "..." && setPage(pageNumber - 1)
                    }
                    sx={{ padding: "2px", marginRight: 3 }}
                  >
                    {pageNumber}
                  </Typography>
                ))}
              </Box>

              {/* Rows Per Page Dropdown */}
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                size="small"
                sx={{ height: "30px" }}
              >
                {[5, 10, 25, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option} / page
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {/* Next Button */}
          <Button
            sx={{
              borderLeft: "2px solid rgb(0, 0, 0)",
              borderRadius: 0,
              color: "black",
              fontWeight: "bold",
            }}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
          >
            Next
            <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StyledTable;
