import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // For down arrow icon
import axios from "axios";
import iconImage from './log-img.webp';

// Generate random log data for demonstration purposes
const generateRandomLogs = (numLogs) => {
  const logs = [];
  for (let i = 0; i < numLogs; i++) {
    const randomTime = new Date(Date.now() - Math.random() * 1000000000).toISOString();
    logs.push({
      timestamp: randomTime,
      ipAddress: `10.1.75.${Math.floor(Math.random() * 255)}`,
      userAgent: "Fuzz Faster U Fool v2.1.0-dev",
      geoLocation: "Unknown",
      httpHeaders: '{"host":"10.1.75.201:3000","user-agent":"Fuzz Faster U Fool v2.1.0-dev","accept-encoding":"gzip"}',
      urlPath: "/_config.php",
      queryParameters: "{}",
      connectionDuration: `${Math.floor(Math.random() * 3000)}ms`,
      referrer: "",
      cookies: "[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]",
      protocolType: "http",
      portNumber: "3000",
      trafficVolume: Math.floor(Math.random() * 100),
      sessionId: "",
      requestMethod: "GET",
      responseTime: Math.floor(Math.random() * 3000),
      statusCode: 302,
      requestPayloadSize: Math.floor(Math.random() * 1000),
    });
  }
  return logs;
};

// Main Component
const Transactions = () => {
  const [logs, setLogs] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null); // Tracks which row is expanded
  const [searchInput, setSearchInput] = useState(""); // For search functionality
  const [isLoading, setIsLoading] = useState(true);
  const [logRetention, setLogRetention] = useState(7); // Log retention period in days

  // Fetch logs from the API (with error handling and fallback to sample data)
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("");
        setLogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching logs, using sample data instead:", error);
        setLogs(generateRandomLogs(50)); // Generate random logs in case of error
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle log retention period change
  const handleLogRetentionChange = (event) => {
    setLogRetention(event.target.value);
  };

  // Toggle expanded state for a specific log entry (using timestamp)
  const handleToggle = (logId) => {
    setExpandedRows((prevExpanded) => (prevExpanded === logId ? null : logId));
  };

  // Filter logs based on search input and log retention period
  const filteredLogs = logs
    .filter((log) => log.ipAddress.toLowerCase().includes(searchInput.toLowerCase()))
    .filter((log) => {
      const logDate = new Date(log.timestamp);
      const retentionDate = new Date();
      retentionDate.setDate(retentionDate.getDate() - logRetention);
      return logDate >= retentionDate;
    });

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center">
        {/* Heading */}
        <Typography style={{ fontSize: "30px", color: "#ffb1ff", fontWeight: "bold" }} variant="h4" gutterBottom>
          IP LOG DATA
        </Typography>
        <img src={iconImage} alt="IP Log Icon" style={{ width: '100px', marginLeft: '10px', paddingLeft: '15px' }} />
      </Box>

      {/* Subtitle */}
      <Typography variant="subtitle1" gutterBottom>
        List of IPs and log details
      </Typography>

      {/* Search Bar and Log Retention Dropdown */}
      <Box display="flex" mb="1rem" justifyContent="space-between">
        <TextField
          label="Search by IP"
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={handleSearchInputChange}
        />

        {/* Dropdown for selecting log retention period */}
        <FormControl variant="outlined" style={{ width: '200px', marginLeft: '20px' }}>
          <InputLabel>Retention Period</InputLabel>
          <Select
            value={logRetention}
            onChange={handleLogRetentionChange}
            label="Retention Period"
          >
            <MenuItem value={1}>1 Day</MenuItem>
            <MenuItem value={7}>7 Days</MenuItem>
            <MenuItem value={30}>30 Days</MenuItem>
            <MenuItem value={90}>90 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: "18px", color: "#00829b", fontWeight: "bold" }}>IP Address</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#00829b", fontWeight: "bold" }}>Response Time (ms)</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#00829b", fontWeight: "bold" }}>Timestamp</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#00829b", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log) => {
                const logId = `${log.timestamp}`; // Unique identifier

                return (
                  <React.Fragment key={logId}>
                    {/* Main Row */}
                    <TableRow>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{log.responseTime}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggle(logId)}>
                          {expandedRows === logId ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row with log details */}
                    <TableRow>
                      <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRows === logId} timeout="auto" unmountOnExit>
                          <Box margin={2}>
                            <Typography>
                              <strong>User Agent:</strong> {log.userAgent}
                            </Typography>
                            <Typography>
                              <strong>Geo Location:</strong> {log.geoLocation}
                            </Typography>
                            <Typography>
                              <strong>Request Method:</strong> {log.requestMethod}
                            </Typography>
                            <Typography>
                              <strong>Status Code:</strong> {log.statusCode}
                            </Typography>
                            <Typography>
                              <strong>URL Path:</strong> {log.urlPath}
                            </Typography>
                            {log.queryParameters && log.queryParameters !== "{}" ? (
                              <Typography>
                                <strong>Query Parameter:</strong> {log.queryParameters}
                              </Typography>
                            ) : null}
                            <Typography>
                              <strong>Connection Duration:</strong> {log.connectionDuration}
                            </Typography>
                            {log.cookies && log.cookies !== "[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]" ? (
                              <Typography>
                                <strong>Cookies:</strong> {log.cookies}
                              </Typography>
                            ) : null}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Transactions;
