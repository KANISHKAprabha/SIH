import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const WAFSpikeDetectionGraph = ({ timeView }) => {
  const [trafficData, setTrafficData] = useState([]);
  const [spikePoints, setSpikePoints] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  const generateRandomData = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100));

  useEffect(() => {
    let interval;
    if (timeView === "Real-time") {
      // Real-time simulation with random data
      interval = setInterval(() => {
        const newTraffic = Math.floor(Math.random() * 100); // Simulating traffic values
        setTrafficData((prevData) => {
          const updatedData = [...prevData, newTraffic].slice(-20); // Keep the last 20 data points
          detectSpikes(updatedData);
          return updatedData;
        });
        setTimeLabels((prevLabels) => {
          const newLabel = new Date().toLocaleTimeString();
          return [...prevLabels, newLabel].slice(-20); // Keep the last 20 labels
        });
      }, 1000);
    } else {
      let size;
      if (timeView === "Hourly") size = 24;
      else if (timeView === "Daily") size = 30;
      else if (timeView === "30 Days") size = 30;
      else if (timeView === "60 Days") size = 60;
      else if (timeView === "90 Days") size = 90;

      const randomTrafficData = generateRandomData(size);
      setTrafficData(randomTrafficData);
      detectSpikes(randomTrafficData);

      // Set time labels based on the timeView
      setTimeLabels([...Array(size).keys()].map(i => {
        if (timeView === "Hourly") return `Hour ${i + 1}`;
        else if (timeView === "Daily") return `Day ${i + 1}`;
        else return `Day ${i + 1}`; // For 30/60/90 days
      }));
    }

    return () => clearInterval(interval);
  }, [timeView]);

  const detectSpikes = (updatedData) => {
    const threshold = 70; // Set your spike threshold here
    const spikes = updatedData.map((point) => (point > threshold ? point : null));
    setSpikePoints(spikes);
  };

  const chartOptions = {
    chart: {
      id: "spike-detection-traffic",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    xaxis: {
      categories: timeLabels,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 6,
      colors: spikePoints.map((point) => (point ? "#FF4560" : "transparent")), // Highlight spike points in red
    },
    title: {
      text: "Traffic Spike Detection",
      align: "center",
    },
  };

  const chartSeries = [
    {
      name: "Traffic",
      data: trafficData,
    },
  ];

  return (
    <div>
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default WAFSpikeDetectionGraph;
