import React, { useState } from "react";
import { Box, Typography, Switch, TextField, MenuItem, Button, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const SettingsBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "1rem",
  backgroundColor: "#292929",
  marginBottom: theme.spacing(4),
  textAlign: "left",
  color: theme.palette.common.white,
}));

const LimitingControls = () => {
  const [wafEnabled, setWafEnabled] = useState(false);
  const [requestsPerSec, setRequestsPerSec] = useState("");
  const [clientIp, setClientIp] = useState("");
  const [blockDuration, setBlockDuration] = useState("");
  const [attackType, setAttackType] = useState("UDP Flood");
  const [thresholdValue, setThresholdValue] = useState("");
  const [allowedPackets, setAllowedPackets] = useState("");

  // Handle WAF toggle switch
  const handleWafToggle = () => {
    setWafEnabled(!wafEnabled);
  };

  return (
    <Box m="2rem">
      {/* WAF Protection Settings */}
      <SettingsBox>
        <Typography variant="h6" gutterBottom>
          WAF Protection Settings
        </Typography>

        {/* WAF Toggle */}
        <Typography variant="body1" gutterBottom>
          Enable WAF Protection
        </Typography>
        <Switch checked={wafEnabled} onChange={handleWafToggle} />

        {wafEnabled && (
          <Box mt="1.5rem">
            {/* Requests per Second */}
            <TextField
              label="Requests Allowed per Second"
              value={requestsPerSec}
              onChange={(e) => setRequestsPerSec(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ style: { color: "#fff" } }}
            />

            {/* Client IP */}
            <TextField
              label="Client IP"
              value={clientIp}
              onChange={(e) => setClientIp(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ style: { color: "#fff" } }}
            />

            {/* Block Duration */}
            <TextField
              label="Block Duration (in seconds)"
              value={blockDuration}
              onChange={(e) => setBlockDuration(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ style: { color: "#fff" } }}
            />

            {/* Attack Type Dropdown */}
            <Typography variant="body1" gutterBottom mt="2rem">
              Attack Type
            </Typography>
            <Select
              value={attackType}
              onChange={(e) => setAttackType(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ color: "#fff" }}
            >
              <MenuItem value="UDP Flood">UDP Flood</MenuItem>
              <MenuItem value="SYN Flood">SYN Flood</MenuItem>
              <MenuItem value="HTTP GET Flood">HTTP GET Flood</MenuItem>
              <MenuItem value="Slowloris">Slowloris</MenuItem>
            </Select>

            {/* Threshold Value */}
            <TextField
              label="Threshold Value"
              value={thresholdValue}
              onChange={(e) => setThresholdValue(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ style: { color: "#fff" } }}
            />

            {/* Allowed Packets */}
            <TextField
              label="Number of Packets Allowed per Request"
              value={allowedPackets}
              onChange={(e) => setAllowedPackets(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ style: { color: "#fff" } }}
            />
          </Box>
        )}
      </SettingsBox>

      {/* Attack Control Settings */}
      <SettingsBox>
        <Typography variant="h6" gutterBottom>
          Attack Control Settings
        </Typography>

        {/* Example controls for threshold per attack */}
        <Typography variant="body1" gutterBottom>
          Set Threshold for Specific Attack Types
        </Typography>

        {/* Attack Type Dropdown */}
        <Select
          value={attackType}
          onChange={(e) => setAttackType(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ color: "#fff" }}
          margin="normal"
        >
          <MenuItem value="UDP Flood">UDP Flood</MenuItem>
          <MenuItem value="SYN Flood">SYN Flood</MenuItem>
          <MenuItem value="HTTP GET Flood">HTTP GET Flood</MenuItem>
          <MenuItem value="Slowloris">Slowloris</MenuItem>
        </Select>

        {/* Threshold Value */}
        <TextField
          label="Threshold Value for Attack"
          value={thresholdValue}
          onChange={(e) => setThresholdValue(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ style: { color: "#fff" } }}
        />
      </SettingsBox>

      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default LimitingControls;
