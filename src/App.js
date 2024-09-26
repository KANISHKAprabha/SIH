import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";

import Customers from "scenes/waf-controls";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/Monitoring-attack";
import AppNotifications from "scenes/daily";

import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/WAF controls" element={<Customers />} />
              <Route path="/log data" element={<Transactions />} />
              <Route path="/Ip location" element={<Geography />} />
              <Route path="/Monitoring Attacks" element={<Overview />} />
            
              
              <Route path="/Report" element={<Breakdown />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<AppNotifications/>} />
              
             
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
