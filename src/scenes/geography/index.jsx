import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";

// Mock API call to get random IP locations
const fetchRandomIPLocations = async (count = 20) => {
  const randomIPs = Array.from({ length: count }, () => ({
    ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}`,
    lat: (Math.random() * 180 - 90).toFixed(2), // Random latitude between -90 and 90
    long: (Math.random() * 360 - 180).toFixed(2), // Random longitude between -180 and 180
  }));

  return randomIPs;
};

// Helper function to convert lat/long to x/y for the map overlay
const convertLatLongToXY = (lat, long, width, height) => {
  // Simple equirectangular projection for latitude/longitude to x/y
  const x = ((long + 180) * (width / 360)).toFixed(2); // Longitude to X
  const y = ((90 - lat) * (height / 180)).toFixed(2); // Latitude to Y
  return { x, y };
};

const Geography = () => {
  const theme = useTheme();
  const [ipLocations, setIpLocations] = useState([]);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Simulate API call to get random IP locations
    const getData = async () => {
      const data = await fetchRandomIPLocations();
      setIpLocations(data);
    };

    getData();
  }, []);

  // When the map renders, set the map's size for pin positioning
  useEffect(() => {
    const mapElement = document.getElementById("choropleth-map");
    if (mapElement) {
      setMapSize({
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight,
      });
    }
  }, [ipLocations]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="IP LOCATIONS" subtitle="Find where your DDoS requests originate." />
      <Box
        id="choropleth-map"
        mt="40px"
        height="75vh"
        position="relative"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {ipLocations.length > 0 ? (
          <>
            <ResponsiveChoropleth
              data={ipLocations.map((location, idx) => ({
                id: idx + 1,
                value: 1, // Setting value to 1 for each location
                lat: location.lat,
                long: location.long,
              }))}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
              }}
              features={geoData.features}
              margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
              domain={[0, 60]}
              unknownColor="#666666"
              label="properties.name"
              valueFormat=".2s"
              projectionScale={150}
              projectionTranslation={[0.45, 0.6]}
              projectionRotation={[0, 0, 0]}
              borderWidth={1.3}
              borderColor="#ffffff"
            />
            {/* Overlay Pins */}
            {ipLocations.map((location, idx) => {
              const { x, y } = convertLatLongToXY(
                location.lat,
                location.long,
                mapSize.width,
                mapSize.height
              );
              return (
                <Box
                  key={idx}
                  sx={{
                    position: "absolute",
                    top: `${y}px`,
                    left: `${x}px`,
                    backgroundColor: "#ff0000",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  title={`IP: ${location.ip}\nLat: ${location.lat}, Long: ${location.long}`}
                />
              );
            })}
          </>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
