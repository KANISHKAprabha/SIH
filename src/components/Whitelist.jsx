import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const Whitelist = ({ whitelist, onBlock }) => {
  return (
    <Box m="2rem">
      {/* Increased font size for the Allowed IPs heading */}
      <Typography variant="h4" color="white" gutterBottom>
        Allowed IPs
      </Typography>
      <List>
        {whitelist.map((ip, index) => (
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
              "&:hover .block-btn": { display: "block" },  // Show Block button on hover
            }}
          >
            {/* Displaying Serial No. and increasing font size of IP */}
            <ListItemText
              primary={` ${index + 1}  : ${ip}`}
              primaryTypographyProps={{
                color: "white",
                fontSize: "1.25rem",  // Increased font size for IP addresses
                fontWeight: "bold",   // Making IP bold for emphasis
              }}
            />
            <Button
              className="block-btn"
              sx={{
                display: "none",
                backgroundColor: "#FF3B30",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 5px 10px rgba(255, 59, 48, 0.5)", // 3D effect for the button
                "&:hover": {
                  backgroundColor: "#FF1F1F",
                  boxShadow: "0px 7px 15px rgba(255, 59, 48, 0.8)", // Stronger effect on hover
                }
              }}
              onClick={() => onBlock(ip)}
            >
              Block
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Whitelist;
