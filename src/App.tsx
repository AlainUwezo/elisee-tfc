import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "./modules/ClientModule/Client";
import Withdrawal from "./modules/WithdrawalModule/Withdrawal";
import { StyledEngineProvider } from "@mui/material";
import Parcel from "./modules/ParcelModule/Parcel";
import AjoutColis from "./modules/ParcelModule/AjoutColis";
import Dashboard from "./modules/DashboardModule/Dashboard";
import SignIn from "./modules/AuthModule/signIn";
import SignUp from "./modules/AuthModule/signUp";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./layoutes/ProtectedRoute";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <Client />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdrawals"
              element={
                <ProtectedRoute>
                  <Withdrawal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parcels"
              element={
                <ProtectedRoute>
                  <Parcel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-colis"
              element={
                <ProtectedRoute>
                  <AjoutColis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default App;
