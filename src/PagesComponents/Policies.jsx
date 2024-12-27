import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  Menu
} from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useDispatch, useSelector } from "react-redux";
import FetchAllPolicies from "../Services/getAllPolicies";
import fetchPoliciesSuccess from "../Redux/newThreatSlice";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import CreatePolicy from "../Services/createPolicy";
import { formatDate } from "../Utiles/dateFormat";
import "../styles/PolicyList.css"; // External styles
import Loading from "../components/Loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const PolicyList = () => {
  const dispatch = useDispatch();
  const ReduxData = useSelector((state) => state.newThreadSlice)
  const loading = useSelector((state) => state.newThreadSlice.loading);
  const [selectedAction, setSelectedAction] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("DEFAULT");
  const [selectedItems, setSelectedItems] = useState([]);
  const [policyName, setPolicyName] = useState("");
  const [createPolicyError, setPolicyError] = useState("");
  const [allowedScore, setAllowedScore] = useState("50");
  const threatNames = JSON.parse(localStorage.getItem("threatIds"));
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleAddPolicy = () => {
    if (
      !policyName ||
      !selectedRadio ||
      !selectedItems.length ||
      allowedScore === ""
    ) {
      setPolicyError("All fields are required.");
      return;
    }
    setPolicyError("");
    const fetchLatestPolicies = async () => {
      try {
        const policies = await FetchAllPolicies();
        dispatch(fetchPoliciesSuccess(policies));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };


    const createPolicyAPI = async () => {
      const payload = {
        id: "0",
        name: policyName,
        group: selectedRadio,
        threatList: selectedItems,
        score: allowedScore,
      }
      try {
        const ReportedThreats = await CreatePolicy(payload.id, payload.name, payload.group, payload.threatList, payload.score)
        toggleDialog();
        await fetchLatestPolicies();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    createPolicyAPI()
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedItems(typeof value === "string" ? value.split(",") : value);
  };
  if (loading) {
    return <Loading />;
  }
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor to open the menu on the clicked icon
  };



  const filteredData = (ReduxData.policies?.policyThreatList || [])
    .map((item) => ({
      threatName: item.policyDetails.name,
      allowedScore: item.policyDetails.totalAllowedScore,
      status: item.policyDetails.statusType,
      fourthValue: item.threatCount,
      createdTime: formatDate(item.policyDetails.creationTime),
      updatedTime: formatDate(item.policyDetails.updatedTime),
      icon: (
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      ),
    }))
    .filter(
      (item) =>
        statusFilter === "All" ||
        item.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .sort((a, b) => {
      const valueA = a.threatName || "";
      const valueB = b.threatName || "";
      return valueA.localeCompare(valueB);
    });
  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };
  const handleMenuAction = (action) => {
    setSelectedAction(action);
    handleCloseMenu();
    console.log(`${action} action triggered.`);
  };

  return (
    <>
      <Title data={"Policies"} />
      <Box className="policy-list-header">
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDialog}
          className="policy-list-add-button"
        >
          + Add Policy
        </Button>

        <ButtonGroup
          variant="contained"
          aria-label="status filter"
          className="policy-list-filter-group"
        >
          {["All", "Active", "Inactive"].map((status) => (
            <Button
              key={status}
              onClick={() => setStatusFilter(status)}
              color={statusFilter === status ? "primary" : "default"}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {filteredData.length > 0 ? (
        <StyledTable
          data={filteredData}
          titles={[
            "Policy Name",
            "Allowed Score",
            "Status",
            "Total Threats",
            "Created",
            "Updated",
            "Action",
          ]}
        />
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">No data available</Typography>
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleMenuAction("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuAction("Delete")}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={toggleDialog}
        className="policy-list-dialog"
      >
        <DialogContent>
          <Box className="policy-list-dialog-content">
            <Typography variant="h6" className="policy-list-dialog-title">
              Add Policy
            </Typography>
            <FormControl component="fieldset" className="policy-list-mode">
              <Typography variant="subtitle1">Mode</Typography>
              <RadioGroup
                row
                value={selectedRadio}
                onChange={(e) => setSelectedRadio(e.target.value)}
              >
                <FormControlLabel
                  value="DEFAULT"
                  control={<Radio />}
                  label="DEFAULT"
                />
                <FormControlLabel
                  value="CUSTOM"
                  control={<Radio />}
                  label="CUSTOM"
                />
              </RadioGroup>
            </FormControl>

            <FormControl className="policy-list-select">
              <Typography variant="subtitle1">Select Threats</Typography>
              <Select
                multiple
                value={selectedItems}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {threatNames.map((item) => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={selectedItems.indexOf(item) > -1} />
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Policy Name"
              variant="outlined"
              fullWidth
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              className="policy-list-name-input"
            />
            <TextField
              label="Allowed Score"
              variant="outlined"
              fullWidth
              type="number"
              disabled={selectedRadio === "DEFAULT" ? true : false}
              value={allowedScore}
              onChange={(e) => setAllowedScore(e.target.value)}
              error={!!createPolicyError}
              helperText={createPolicyError}
              className="policy-list-score-input"
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddPolicy}
              className="policy-list-add-confirm-button"
            >
              Add
            </Button>
          </Box>
        </DialogContent>
        <DialogActions className="policy-list-dialog-actions"></DialogActions>
      </Dialog>
    </>
  );
};

export default PolicyList;
