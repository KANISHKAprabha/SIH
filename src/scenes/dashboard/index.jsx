import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import BlockedRequestsChart from "components/BlockedRequestsChart";
import { PointOfSale, Traffic } from "@mui/icons-material";
import { DownloadOutlined, QueryStats as QueryStatsIcon, DoDisturbAltRounded as DoDisturbAltRoundedIcon, StorageRounded as StorageRoundedIcon, PanTool } from "@mui/icons-material";

const Health_url = "";
const time_url = "";
const top_url = "";

const generateRandomIP = () => {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
};

const generateRandomData = (count) => {
  const statuses = ["Success", "Failed", "Pending", "Blocked"];
  const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    userId: generateRandomIP(),
    createdAt: new Date().toLocaleString(),
    serverIP: generateRandomIP(),
    requestStatus: getRandomStatus(),
    requestedTime: (Math.random() * 1000).toFixed(2),
  }));
};

const NotificationPopup = ({ message, onClose }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 20,
      right: 20,
      backgroundColor: 'secondary.main',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000,
      transition: 'opacity 0.5s',
    }}
    onClick={onClose}
  >
    {message}
  </Box>
);

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();

  const [data] = useState(generateRandomData(500));
  const [isLoading, setIsLoading] = useState(false);
  const [serverUptime, setServerUptime] = useState("656");
  const [serverDowntime, setServerDowntime] = useState("26");
  const [serverHealth, setServerHealth] = useState("Healthy");
  const [totalRequestsData, setTotalRequestsData] = useState("560");
  const [blockedRequestsData, setBlockedRequestsData] = useState("457");
  const [blockedPercentage, setBlockedPercentage] = useState("70");
  const [notifications, setNotifications] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const timeResponse = await fetch(time_url);
        const resolvedTimeData = await timeResponse.json();
        setServerUptime(Math.round(resolvedTimeData.uptime / 60));
        setServerDowntime(Math.round(resolvedTimeData.downtime / 60));

        const healthResponse = await fetch(Health_url);
        const healthStatus = await healthResponse.json();
        setServerHealth(healthStatus.status);

        const topResponse = await fetch(top_url);
        const topData = await topResponse.json();
        const { total_requests, blocked_requests } = topData;
        setTotalRequestsData(total_requests);
        setBlockedRequestsData(blocked_requests);
        const percentage = ((blocked_requests / total_requests) * 100).toFixed(2);
        setBlockedPercentage(percentage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIP = generateRandomIP();
      const newNotification = `New alert from IP: ${randomIP} at ${new Date().toLocaleTimeString()}`;
      setNotifications((prev) => [...prev, newNotification]);
      setPopupVisible(true);
      
      // Hide popup after a delay
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    }, 5000); // Adjust time interval as needed
  
    return () => clearInterval(interval);
  }, []);
  
  const handleRowClick = (params) => {
    if (params.field === "userId") {
      navigate("/customers", { state: { ipAddress: params.value } });
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "userId",
      headerName: "User IP",
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleRowClick(params)} style={{ fontSize: "14px", color: "white" }}>
          {params.value}
        </Button>
      ),
    },
    { field: "requestStatus", headerName: "Request Status", flex: 1 },
    { field: "serverIP", headerName: "Server IP", flex: 1 },
    {
      field: "requestedTime",
      headerName: "Requested Time (ms)",
      flex: 1,
      renderCell: (params) => `${params.value} ms`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={<Typography sx={{ fontSize: "34px", fontWeight: "bold" }}>CYBER DASHBOARD</Typography>}
          subtitle={<Typography sx={{ fontSize: "18px" }}>Welcome to your Cyber dashboard</Typography>}
        />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "12px 24px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/* Popups for notifications */}
      {popupVisible && notifications.length > 0 && (
        <NotificationPopup message={notifications[notifications.length - 1]} onClose={() => setPopupVisible(false)} />
      )}

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="16px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        justifyContent="center"
      >
        {/* Stat boxes */}
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Total Queries</Typography>}
            value={<Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{totalRequestsData}</Typography>}
            icon={<QueryStatsIcon sx={{ color: theme.palette.secondary[300], fontSize: "65px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Queries Blocked</Typography>}
            value={<Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{blockedRequestsData}</Typography>}
            icon={<DoDisturbAltRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Domains On Add list</Typography>}
            value={<Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>15</Typography>}
            icon={<StorageRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Block %</Typography>}
            value={<Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{blockedPercentage}%</Typography>}
            icon={<PanTool sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>

        {/* BlockedRequestsChart */}
        <Box gridColumn="span 12" gridRow="span 3" gridLineColor="white" backgroundColor="#292929" p="1rem" borderRadius="0.55rem">
          <BlockedRequestsChart isDashboard />
        </Box>

        {/* OverviewChart */}
        <Box gridColumn="span 12" gridRow="span 3" backgroundColor={theme.palette.background.alt} p="1rem" borderRadius="0.55rem">
          <OverviewChart view="sales" isDashboard />
        </Box>

        {/* DataGrid */}
        <Box
          mt="2rem"
          height="300px"
          gridColumn="span 12"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              fontSize: "14px",
              color: theme.palette.secondary[200],
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid rows={data} columns={columns} loading={isLoading} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
