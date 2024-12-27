// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Button, ButtonGroup, Box } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";
// import StyledTable from "../Containers/Table";
// import Title from "../Containers/Title";
// import Loading from "../components/Loading";
// import { formatText } from "../Utiles/textFormat";
// import CircleIcon from "@mui/icons-material/Circle";
// const ThreatOverView = () => {
//   const navigate = useNavigate();
//   const ReduxData = useSelector((state) => state.newThreadSlice)
//   const loading = useSelector((state) => state.newThreadSlice.loading);
//   const [riskLevelFilter, setRiskLevelFilter] = useState("All");
//   const filteredData = (ReduxData?.threatsData || [])
//     .map((item) => ({
//       secondValue: formatText(item?.threatId ?? null),
//       thirdValue: item?.threatDescription ?? null,
//       riskLevel: (
//         <>
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//             }}
//           >
//             <CircleIcon
//               sx={{
//                 color:
//                   item?.threatSeverity === "HIGH"
//                     ? "red"
//                     : item?.threatSeverity === "MEDIUM"
//                       ? "orange"
//                       : "green",

//                 fontSize: "15px",
//                 marginRight: "5px",
//                 // Add space between the icon and text
//               }}
//             />
//             {item?.threatSeverity ?? "Unknown"}
//           </span>
//         </>
//       ),
//       fourthValue: item?.threatGroupType ?? "Unknown",
//       action: (
//         <VisibilityIcon
//           sx={{ color: "#7c77f5", cursor: "pointer" }}
//           onClick={() => handleIconClick(item)}
//         />
//       ),
//     }))
//     .filter(
//       (item) =>
//         riskLevelFilter === "All" ||
//         item.riskLevel.toLowerCase() === riskLevelFilter.toLowerCase()
//     );

//   const handleIconClick = (item) => {
//     const requestData = {
//       reportId: item.id,
//       threatId: item.threatId,
//       mobileNumber: "string",
//     };
//     navigate(`/threats-overview/${item.id}`, { state: { requestData } });
//   };
//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <Title data={"Threats OverView"} />

//       <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
//         <ButtonGroup variant="contained" aria-label="risk level filter">
//           {["All", "Low", "Medium", "High"].map((level) => (
//             <Button
//               key={level}
//               onClick={() => setRiskLevelFilter(level)}
//               color={riskLevelFilter === level ? "primary" : "default"}
//             >
//               {level}
//             </Button>
//           ))}
//         </ButtonGroup>
//       </Box>

//       {filteredData.length > 0 ? (
//         <StyledTable
//           data={filteredData}
//           titles={["Threat Name", "Threat Desc", "Severity", "Group", "Action"]}
//         />
//       ) : (
//         <p>No data available</p>
//       )}
//     </>
//   );
// };

// export default ThreatOverView;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import StyledTable from "../Containers/Table";
import Title from "../Containers/Title";
import Loading from "../components/Loading";
import { formatText } from "../Utiles/textFormat";
import CircleIcon from "@mui/icons-material/Circle";

const ThreatOverView = () => {
  const navigate = useNavigate();
  const ReduxData = useSelector((state) => state.newThreadSlice);
  const loading = useSelector((state) => state.newThreadSlice.loading);
  const [riskLevelFilter, setRiskLevelFilter] = useState("All");

  const handleIconClick = (item) => {
    const requestData = {
      reportId: item.id,
      threatId: item.threatId,
      mobileNumber: "string",
    };
    navigate(`/threats-overview/${item.id}`, { state: { requestData } });
  };

  // Filter data before mapping to formatted values
  const filteredData = (ReduxData?.threatsData || [])
    .filter((item) =>
      riskLevelFilter === "All"
        ? true
        : item.threatSeverity &&
          item.threatSeverity.toLowerCase() === riskLevelFilter.toLowerCase()
    )
    .map((item) => ({
      secondValue: formatText(item?.threatId ?? null),
      thirdValue: item?.threatDescription ?? null,
      riskLevel: (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            // width: "100px",
          }}
        >
          <CircleIcon
            sx={{
              color:
                item?.threatSeverity === "HIGH"
                  ? "red"
                  : item?.threatSeverity === "MEDIUM"
                  ? "orange"
                  : "green",
              fontSize: "15px",
              marginRight: "5px",
            }}
          />
          {item?.threatSeverity ?? "Unknown"}
        </span>
      ),
      fourthValue: item?.threatGroupType ?? "Unknown",
      action: (
        <VisibilityIcon
          sx={{ color: "#7c77f5", cursor: "pointer" }}
          onClick={() => handleIconClick(item)}
        />
      ),
    }));

  if (loading) {
    return <Loading />;
  }

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
          // align="left"
        />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default ThreatOverView;
