import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, ThemeProvider, CssBaseline ,Grid} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { themeSettings } from "../../theme.js"; // Assuming theme.js is in the same folder
import WAFVisualization from "../../components/radar.jsx";
import WAFRuleSettings from "components/waf-rule.jsx";
import Whitelist from "../../components/Whitelist.jsx";
import Blocklist from "../../components/blockList.jsx";
import LimitingControls from "../../components/Rate-Limiting.jsx";
import Dahboard1 from "../../components/line.jsx"

const WAFControlPage = ({ mode = "dark" }) => {
  const muiTheme = createTheme(themeSettings(mode));  // Create theme based on the mode (dark or light)
  const [selectedTab, setSelectedTab] = useState(0);

  // Step 1: Initial data for whitelist and blocklist (replace with your own if necessary)
  const initialWhitelist = Array.from({ length: 100 }, (_, i) => `192.168.1.${i + 1}`);
  const initialBlocklist = [];

  const [whitelist, setWhitelist] = useState(initialWhitelist);
  const [blocklist, setBlocklist] = useState(initialBlocklist);

  // Step 2: Function to block an IP (move from whitelist to blocklist)
  const handleBlockIP = (ip) => {
    setWhitelist(whitelist.filter((item) => item !== ip)); // Remove from whitelist
    setBlocklist([...blocklist, ip]); // Add to blocklist
  };

  // Step 3: Function to unblock an IP (move from blocklist to whitelist)
  const handleUnblockIP = (ip) => {
    setBlocklist(blocklist.filter((item) => item !== ip)); // Remove from blocklist
    setWhitelist([...whitelist, ip]); // Add back to whitelist
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box m="1.9rem 2.9rem">
        {/* Header with WAF Settings Title */}
        <FlexBetween>
          <Header title="WAF Settings" subtitle="Manage your web application firewall settings" />
        </FlexBetween>

        {/* Horizontal Navigation Bar */}
        <Box mt="20px">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="WAF Settings Tabs"
          >
            <Tab label="Visualization" />
            <Tab label="Limiting Controls" />
            <Tab label="Whitelist" />
            <Tab label="Blocklist" />
          </Tabs>
        </Box>

        {/* Tab Content Placeholder */}
        <Box mt="20px">
          {selectedTab === 0 && (
            <Typography>
              <Box
                gridColumn="span 8"
                gridRow="span 3"
                backgroundColor={"black"}
                p="1rem"
                borderRadius="0.55rem"
              >
                <WAFVisualization   />
              </Box>

              <Box>
              <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={"black"}
          p="1rem"
          borderRadius="0.55rem"
        >
          <WAFRuleSettings />
        </Box>
                  
                
              </Box>
            </Typography>
          )}
          {selectedTab === 1 && (
            <Typography>
              <Box>
                <LimitingControls />
              </Box>
            </Typography>
          )}
          {selectedTab === 2 && (
            <Typography>
              {/* Step 4: Pass whitelist data and handleBlock function */}
              <Box>
                <Whitelist whitelist={whitelist} onBlock={handleBlockIP} />
              </Box>
            </Typography>
          )}
          {selectedTab === 3 && (
            <Typography>
              {/* Step 5: Pass blocklist data and handleUnblock function */}
              <Box>
                <Blocklist blocklist={blocklist} onUnblock={handleUnblockIP} />
              </Box>
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WAFControlPage;
