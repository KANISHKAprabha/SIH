import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const AppNotifications= () => {
  // State for thresholds and notifications
  const [trafficThreshold, setTrafficThreshold] = useState(70);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [trafficSurge, setTrafficSurge] = useState(50);

  // Simulate periodic updates for traffic data
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrafficSurge = Math.floor(Math.random() * 100);
      setTrafficSurge(newTrafficSurge);

      // Check if the traffic surge exceeds the threshold
      if (newTrafficSurge > trafficThreshold) {
        triggerNotification(`Traffic Surge Alert: ${newTrafficSurge}%`);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [trafficThreshold]);

  // Function to handle notification pop-up
  const triggerNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        App Notifications
      </Typography>
      <Typography variant="body1" gutterBottom>
        Set your traffic surge threshold to receive notifications.
      </Typography>

      {/* Traffic Threshold Slider */}
      <Typography gutterBottom>
        Traffic Surge Threshold: {trafficThreshold}%
      </Typography>
      <Slider
        value={trafficThreshold}
        onChange={(e, value) => setTrafficThreshold(value)}
        aria-labelledby="traffic-threshold-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={100}
        sx={{ marginBottom: '30px' }}
      />

      {/* Notification Dialog */}
      <Dialog open={showNotification} onClose={handleClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{notificationMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppNotifications;
