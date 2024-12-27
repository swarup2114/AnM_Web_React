import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreats } from "../reduxtoolkit/Slices/threats";
import { Button, ButtonGroup, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import Loading from "../components/Loading";
import { formatText } from "../Utiles/textFormat";

const ThreatsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.threats);
  const { loading: reportedThreatsLoading, error: reportedThreatsError } =
    useSelector((state) => state.reportedThreat);
  const [riskLevelFilter, setRiskLevelFilter] = useState("All");

  useEffect(() => {
    if (status === "idle") dispatch(fetchThreats());
  }, [dispatch, status]);

  if (status === "loading" || reportedThreatsLoading) return <Loading />;
  if (status === "failed" || reportedThreatsError)
    return <div>Error: {error || reportedThreatsError}</div>;

  const filteredData = (data?.threatsResponseList || [])
    .map((item) => ({
      secondValue: formatText(item?.threatId ?? null),
      thirdValue: item?.threatDescription ?? null,
      riskLevel: item?.threatSeverity ?? "Unknown",
      fourthValue: item?.threatGroupType ?? "Unknown",
      action: (
        <VisibilityIcon
          sx={{ color: "#7c77f5", cursor: "pointer" }}
          onClick={() => handleIconClick(item)}
        />
      ),
    }))
    .filter(
      (item) =>
        riskLevelFilter === "All" ||
        item.riskLevel.toLowerCase() === riskLevelFilter.toLowerCase()
    );

  const handleIconClick = (item) => {
    const requestData = {
      reportId: item.id,
      threatId: item.threatId,
      mobileNumber: "string",
    };
    navigate(`/threats-overview/${item.id}`, { state: { requestData } });
  };

  return (
    <>
      <Title data={"Threats OverView"} />

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
            "View",
          ]}
        />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default ThreatsDetails;
