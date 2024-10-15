import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/AuthModule/Login";
import Client from "./modules/ClientModule/Client";
import Withdrawal from "./modules/WithdrawalModule/Withdrawal";
import { StyledEngineProvider } from "@mui/material";
import Parcel from "./modules/ParcelModule/Parcel";
import AjoutColis from "./modules/ParcelModule/AjoutColis";
import Dashboard from "./modules/DashboardModule/Dashboard";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/withdrawals" element={<Withdrawal />} />
          <Route path="/parcels" element={<Parcel />} />
          <Route path="/add-colis" element={<AjoutColis />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
}

export default App;
