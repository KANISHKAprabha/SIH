import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Select, MenuItem, Slider, Button } from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify




const LoadBalancingRateLimiter = () => {
  const time_url = "";  // Add your API endpoint here
  const [ruleName, setRuleName] = useState('');
  const [loadBalancingMethod, setLoadBalancingMethod] = useState('roundRobin');
  const [selectedServer, setSelectedServer] = useState('');
  const [serverUptime, setServerUptime] = useState(656);
  const [serverDowntime, setServerDowntime] = useState(26);
  const [maxRequests, setMaxRequests] = useState(30);
  
  // List of servers
  const servers = [
    { id: 'server1', name: 'Server 1' },
    { id: 'server2', name: 'Server 2' },
    { id: 'server3', name: 'Server 3' },
    { id: 'server4', name: 'Server 4' },
  ];

  // Dummy data for pie chart
  const data = [
    { name: 'Server 1', traffic: 400 },
    { name: 'Server 2', traffic: 300 },
    { name: 'Server 3', traffic: 300 },
    { name: 'Server 4', traffic: 200 },
  ];

  // Dummy data for line graph
  const lineData = [
    { time: '00:00', traffic: 100 },
    { time: '01:00', traffic: 200 },
    { time: '02:00', traffic: 300 },
    { time: '03:00', traffic: 400 },
    { time: '04:00', traffic: 350 },
    { time: '05:00', traffic: 450 },
    { time: '06:00', traffic: 300 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeResponse = await fetch(time_url);
        const resolvedTimeData = await timeResponse.json();
        setServerUptime(Math.round(resolvedTimeData.uptime / 60));
        setServerDowntime(Math.round(resolvedTimeData.downtime / 60));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle load balancing method change
  const handleLoadBalancingChange = (event) => {
    setLoadBalancingMethod(event.target.value);
    console.log(`Selected load balancing method: ${event.target.value}`);
  };

  const handleRecovery = () => {
    if (!selectedServer) {
      toast.error("Please select a server to recover."); // Show error toast
      return;
    }

    console.log("Recovery process initiated for:", selectedServer);
    toast.success(`Recovery process has started for ${selectedServer}.`); // Show success toast
  };

  // Function to send notifications
  const sendNotification = (server) => {
    if (Notification.permission === "granted") {
      new Notification("Recovery Initiated", {
        body: `Recovery process has started for ${server}.`,
      });
    } else if (Notification.permission === "denied") {
      console.warn("Notification permission denied.");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Recovery Initiated", {
            body: `Recovery process has started for ${server}.`,
          });
        }
      });
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
       <ToastContainer /> 
      <Grid container spacing={4}>
        {/* Load Balancer Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }}
            >
              Load Balancing Settings
            </Typography>
            <TextField
              fullWidth
              label="Rule Name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <Select fullWidth value={loadBalancingMethod} onChange={handleLoadBalancingChange} sx={{ marginBottom: '20px' }}>
              <MenuItem value="roundRobin">Round Robin</MenuItem>
              <MenuItem value="leastConnections">Least Connections</MenuItem>
            </Select>
            <Select fullWidth value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)} sx={{ marginBottom: '20px' }}>
              {servers.map(server => (
                <MenuItem key={server.id} value={server.name}>{server.name}</MenuItem>
              ))}
            </Select>
            <Typography sx={{ marginTop: '20px', fontSize: '16px', color: '#2ECC71' }}>
              Selected Load Balancing Method: {loadBalancingMethod || "None"}
            </Typography>

            {/* Recovery Button */}
            <Button 
              variant="contained" 
              onClick={handleRecovery} 
              sx={{ backgroundColor: '#3498DB', color: '#FFF', marginTop: '20px' }} 
            >
              Recover Server
            </Button>
          </Paper>
        </Grid>

        {/* Rate Limiter Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }}
            >
              Rate Limiting Settings
            </Typography>
            <Slider
              value={maxRequests}
              onChange={(e, value) => setMaxRequests(value)}
              aria-label="Rate Limit"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={100}
              sx={{ marginTop: '20px' }}
            />
          </Paper>
        </Grid>

        {/* Uptime and Downtime Section */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E74C3C' }}
              >
                Server Uptime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#2ECC71' }}>
                Uptime: {serverUptime} minutes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E74C3C' }}
              >
                Server Downtime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#E74C3C' }}>
                Downtime: {serverDowntime} minutes
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Traffic Distribution Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }}
            >
              Traffic Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie dataKey="traffic" data={data} fill="#8884d8" label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00C49F' : '#FFBB28'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Server Traffic Over Time Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }}
            >
              Server Traffic Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineData}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="traffic" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadBalancingRateLimiter;

