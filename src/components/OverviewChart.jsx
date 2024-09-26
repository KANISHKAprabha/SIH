import React, { useState, useEffect } from "react";
import { Box, FormControl, MenuItem, InputLabel, Select, Typography, TextField } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import WAFSpikeDetectionGraph from "./spike-detection";

// Helper function to generate random data
const generateRandomData = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const OverviewChart = () => {
  const [timeView, setTimeView] = useState("Real-time");
  const [graphType, setGraphType] = useState("line");
  const [lineData, setLineData] = useState([]);
  const [histogramData, setHistogramData] = useState([]);
  const [xAxisCategories, setXAxisCategories] = useState([]);

  useEffect(() => {
    let interval;
    
    // Update data based on the timeView
    if (timeView === "Real-time") {
      interval = setInterval(() => {
        const newData = generateRandomData(10);
        setLineData((prevData) => {
          const updatedData = [...prevData, ...newData];
          return updatedData.slice(-10); // Keep only the last 10 data points
        });
        setHistogramData((prevData) => [...prevData, Math.floor(Math.random() * 100)].slice(-10)); // Keep last 10 blocked requests
        setXAxisCategories([...Array(10).keys()].map((i) => `T${i + 1}`)); // Real-time labels
      }, 1000);
    } else {
      let size;
      if (timeView === "Hourly") size = 24;
      else if (timeView === "Daily") size = 30;
      else if (timeView === "30 Days") size = 30;
      else if (timeView === "60 Days") size = 60;
      else if (timeView === "90 Days") size = 90;

      const staticData = generateRandomData(size);
      setLineData(staticData);
      setHistogramData(staticData);
      
      if (timeView === "Hourly") setXAxisCategories([...Array(24).keys()].map((i) => `Hour ${i + 1}`));
      else setXAxisCategories([...Array(size).keys()].map((i) => `Day ${i + 1}`)); // For daily and day views
    }

    return () => clearInterval(interval); // Clear interval for real-time updates
  }, [timeView]);

  const handleTimeViewChange = (value) => {
    setTimeView(value);
  };

  // Line chart options
  const lineChartOptions = {
    chart: {
      id: "line-chart",
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 1000 },
      },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: xAxisCategories,
    },
    yaxis: { max: 100 },
    stroke: { curve: "smooth" },
  };

  // Histogram chart options
  const histogramOptions = {
    chart: {
      id: "histogram",
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: xAxisCategories, // Set categories based on the time view
    },
    yaxis: { max: 100 },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Box m="2rem" sx={{ backgroundColor: "#292929", padding: "1.5rem", borderRadius: "0.75rem", color: "white" }}>
      <Typography variant="h4" gutterBottom>
        DDoS Monitoring
      </Typography>

      <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
        <InputLabel>Time View</InputLabel>
        <Select value={timeView} onChange={(e) => handleTimeViewChange(e.target.value)}>
          <MenuItem value="Real-time">Real-time</MenuItem>
          <MenuItem value="Hourly">Hourly</MenuItem>
          <MenuItem value="Daily">Day</MenuItem>
          <MenuItem value="30 Days">30 Days</MenuItem>
          <MenuItem value="60 Days">60 Days</MenuItem>
          <MenuItem value="90 Days">90 Days</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: "1rem" }}>
        <TextField
          label="Graph Type"
          select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          sx={{ width: "200px", backgroundColor: "#292929", borderRadius: "0.5rem" }}
        >
          <MenuItem value="line">Line Graph</MenuItem>
          <MenuItem value="histogram">Histogram</MenuItem>
          <MenuItem value="spike">Spike Detection</MenuItem>
        </TextField>
      </Box>

      <Box height="75vh" sx={{ mt: "1.5rem" }}>
        {graphType === "line" && (
          <ReactApexChart options={lineChartOptions} series={[{ name: "Requests", data: lineData }]} type="line" height={350} />
        )}
        {graphType === "histogram" && (
          <ReactApexChart options={histogramOptions} series={[{ name: "Blocked Requests", data: histogramData }]} type="bar" height={350} />
        )}
        {graphType === "spike" && (
          <WAFSpikeDetectionGraph timeView={timeView} />
        )}
      </Box>
    </Box>
  );
};

export default OverviewChart;
