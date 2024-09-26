import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, Select, Switch, TextField, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";

// Styled components for settings box
const SettingsBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "1rem",
  backgroundColor: "#292929",
  color: "#ffffff",
  textAlign: "left",
  height: '100%',
}));

// ApexChart class for radar chart
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        { name: "Blocks", data: [80, 50, 30, 40, 100, 20] }, // Blocked counts per WAF rule
        { name: "Triggers", data: [20, 30, 40, 80, 20, 80] }  // Triggered counts per WAF rule
      ],
      options: {
        chart: {
          height: 500, // Increased the size of the graph
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        title: {
          text: 'WAF Rule Radar Chart'
        },
        stroke: {
          width: 5
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 5
        },
        yaxis: {
          stepSize: 20,
          labels: {
            style: {
              colors: '#ffffff' // Changed Y-axis line color
            }
          }
        },
        xaxis: {
          categories: ['SQL Injection', 'Cross-Site Scripting', 'DDoS Attack', 'CSRF', 'File Upload', 'Invalid User Agent'],
          labels: {
            style: {
              colors: '#ffffff', // Changed X-axis labels color
              fontSize: '14px'
            }
          },
          axisBorder: {
            show: true,
            color: '#ffffff' // Changed X-axis border color
          },
          axisTicks: {
            show: true,
            color: '#ffffff' // Changed X-axis ticks color
          }
        }
      },
    };
  }


  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={550} />
      </div>
    );
  }
}

const WAFRuleSettings = () => {
  const [wafRule, setWafRule] = useState("");
  const [ruleEnabled, setRuleEnabled] = useState(false);
  const [ruleType, setRuleType] = useState("");

  // Handle WAF rule selection
  const handleRuleChange = (event) => {
    setWafRule(event.target.value);
  };

  // Handle rule enable/disable toggle
  const handleEnableToggle = () => {
    setRuleEnabled(!ruleEnabled);
  };

  // Handle rule type selection (header, body, URL)
  const handleRuleTypeChange = (event) => {
    setRuleType(event.target.value);
  };

  return (
    <Grid container spacing={4}>
      {/* Left side: Settings Box */}
      <Grid item xs={12} sm={5}>
        <SettingsBox>
          <Typography 
          variant="h6"
         
           gutterBottom>
            WAF Rule Settings
          </Typography>

          {/* WAF Rule Type Dropdown */}
          <Typography variant="body1">Select WAF Rule</Typography>
          <Select
            value={wafRule}
            onChange={handleRuleChange}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ marginBottom: "1rem", color: "#ffffff" }}
          >
            <MenuItem value="SQL Injection">SQL Injection</MenuItem>
            <MenuItem value="Cross-Site Scripting">Cross-Site Scripting</MenuItem>
            <MenuItem value="DDoS Attack">DDoS Attack</MenuItem>
            <MenuItem value="CSRF">CSRF</MenuItem>
            <MenuItem value="File Upload">File Upload</MenuItem>
            <MenuItem value="Invalid User Agent">Invalid User Agent</MenuItem>
          </Select>

          {/* Enable/Disable Toggle */}
          <Typography variant="body1" gutterBottom>
            Enable/Disable Rule
          </Typography>
          <Switch checked={ruleEnabled} onChange={handleEnableToggle} />

          {ruleEnabled && (
            <Box mt="1.5rem">
              {/* Input for Rule Type */}
              <Typography variant="body1">Specify Rule Type (Header, Body, URL)</Typography>
              <TextField
                label="Rule Type"
                value={ruleType}
                onChange={handleRuleTypeChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginTop: "1rem", color: "#fff" }}
              />
            </Box>
          )}

          {/* Save Button */}
          <Box display="flex" justifyContent="flex-end" mt="2rem">
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </SettingsBox>
      </Grid>

      {/* Right side: Radar Chart */}
      <Grid item xs={12} sm={6}>
        <ApexChart />
      </Grid>
    </Grid>
  );
};

export default WAFRuleSettings;
