import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./pages";
import Dashboard from "./pages/dashboard/index";
import NoMatch from "./pages/noMatch";
import AuthProvider, { User } from "./auth";
import { useAuth } from "./components/hooks/useAuth";
import ProtectedRoute from "./protectedRoute";
import AccountSettings from "./pages/accountSettings";
import { RotateLeft } from "@mui/icons-material";
import Customers from "./pages/customers";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Navigation /> */}

        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={["admin", "all"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute  roles={["all"]}>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <ProtectedRoute roles={["all"]}>
                <Customers />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
