import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const Blocklist = ({ blocklist, onUnblock }) => {
  return (
    <Box m="2rem">
      {/* Increased font size for Blocked IPs heading */}
      <Typography variant="h4" color="white" gutterBottom>
        Blocked IPs
      </Typography>
      <List>
        {blocklist.map((ip, index) => (
          <ListItem
            key={ip}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#292929",
              borderRadius: "10px",
              marginBottom: "1rem",  // Gap between IPs
              padding: "1.5rem",     // Increased padding for larger appearance
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",  // 3D effect for the IP container
              "&:hover .unblock-btn": { display: "block" },  // Show Unblock button on hover
            }}
          >
            {/* Displaying Serial No. and increasing font size of IP */}
            <ListItemText
              primary={` ${index + 1}: ${ip}`}
              primaryTypographyProps={{
                color: "white",
                fontSize: "1.25rem",  // Increased font size for IP addresses
                fontWeight: "bold",   // Making IP bold for emphasis
              }}
            />
            <Button
              className="unblock-btn"
              sx={{
                display: "none",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 5px 10px rgba(0, 123, 255, 0.5)",  // 3D effect for the button
                "&:hover": {
                  backgroundColor: "#0056b3",
                  boxShadow: "0px 7px 15px rgba(0, 123, 255, 0.8)",  // Stronger effect on hover
                }
              }}
              onClick={() => onUnblock(ip)}
            >
              Unblock
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Blocklist;

