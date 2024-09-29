import { Drawer, List, Button, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Fonction pour savoir si le lien est actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1a202c",
        }, // Fond sombre
      }}
    >
      <List>
        {/* Tableau de bord */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="text"
            sx={{
              justifyContent: "flex-start",
              color: isActive("/dashboard") ? "#ffdd57" : "#e2e8f0",
              backgroundColor: isActive("/dashboard")
                ? "#2d3748"
                : "transparent",
              "&:hover": { backgroundColor: "#4a5568" },
              py: 2,
            }}
          >
            <DashboardIcon sx={{ color: "inherit", marginRight: 2 }} />
            <Typography variant="body1">Tableau de bord</Typography>
          </Button>
        </Link>

        {/* Clients */}
        <Link to="/clients" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="text"
            sx={{
              justifyContent: "flex-start",
              color: isActive("/clients") ? "#ffdd57" : "#e2e8f0",
              backgroundColor: isActive("/clients") ? "#2d3748" : "transparent",
              "&:hover": { backgroundColor: "#4a5568" },
              py: 2,
            }}
          >
            <PeopleIcon sx={{ color: "inherit", marginRight: 2 }} />
            <Typography variant="body1">Clients</Typography>
          </Button>
        </Link>

        {/* Gestion Retrait */}
        <Link to="/withdrawals" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="text"
            sx={{
              justifyContent: "flex-start",
              color: isActive("/withdrawals") ? "#ffdd57" : "#e2e8f0",
              backgroundColor: isActive("/withdrawals")
                ? "#2d3748"
                : "transparent",
              "&:hover": { backgroundColor: "#4a5568" },
              py: 2,
            }}
          >
            <AssignmentReturnIcon sx={{ color: "inherit", marginRight: 2 }} />
            <Typography variant="body1">Gestion Retrait</Typography>
          </Button>
        </Link>

        {/* Gestion Colis */}
        <Link to="/parcels" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="text"
            sx={{
              justifyContent: "flex-start",
              color: isActive("/parcels") ? "#ffdd57" : "#e2e8f0",
              backgroundColor: isActive("/parcels") ? "#2d3748" : "transparent",
              "&:hover": { backgroundColor: "#4a5568" },
              py: 2,
            }}
          >
            <LocalShippingIcon sx={{ color: "inherit", marginRight: 2 }} />
            <Typography variant="body1">Gestion Colis</Typography>
          </Button>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
