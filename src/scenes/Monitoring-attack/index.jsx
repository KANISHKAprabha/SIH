import React, { useState } from "react";
import {  Box } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("Real-time");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="VISUAL REPRESENTATION"

      />
      <Box height="75vh">
        
      
        <OverviewChart view={view} setView={setView}  />
        
      </Box>
    </Box>
  );
};

export default Overview;
