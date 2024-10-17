import { Drawer, List, Button, Typography, Divider, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/DashboardOutlined"; // Utiliser l'icône outlined
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturnOutlined"; // Utiliser l'icône outlined
import LocalShippingIcon from "@mui/icons-material/LocalShippingOutlined"; // Utiliser l'icône outlined
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined"; // Importer l'icône pour Ajouter colis
import { useLocation, Link } from "react-router-dom";
import logo from "./../../../assets/logo.png";
import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const { userInfo } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          color: "#2c3e50",
        },
      }}
    >
      {/* Titre et Description */}
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />

          <Typography
            variant="h6"
            sx={{ color: "#34495e", fontWeight: "bold" }}
          >
            E-Trans
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#7f8c8d", marginTop: 1 }}>
          Gérer vos opérations avec efficacité et simplicité.
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "#f1f1f1", marginBottom: 1 }} />

      <List>
        {/* Tableau de bord */}

        {userInfo?.role === "ROLE_ADMIN" && (
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="text"
              sx={{
                justifyContent: "flex-start",
                color: isActive("/dashboard") ? "#2980b9" : "#2c3e50",
                backgroundColor: isActive("/dashboard")
                  ? "#dfe6e9"
                  : "transparent",
                "&:hover": { backgroundColor: "#bdc3c7" },
                py: 1.5, // Réduire la hauteur du bouton
                borderRadius: "4px", // Bords arrondis
                transition: "background-color 0.3s", // Transition douce
              }}
            >
              <DashboardIcon sx={{ color: "inherit", marginRight: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "capitalize" }}
              >
                Tableau de bord
              </Typography>
            </Button>
          </Link>
        )}

        {/* Clients */}
        {/* <Link to="/clients" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="text"
            sx={{
              justifyContent: "flex-start",
              color: isActive("/clients") ? "#2980b9" : "#2c3e50",
              backgroundColor: isActive("/clients") ? "#dfe6e9" : "transparent",
              "&:hover": { backgroundColor: "#bdc3c7" },
              py: 1.5, // Réduire la hauteur du bouton
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
          >
            <PeopleIcon sx={{ color: "inherit", marginRight: 2 }} />
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              Clients
            </Typography>
          </Button>
        </Link> */}

        {/* Gestion Retrait */}
        {(userInfo?.role === "ROLE_ADMIN" ||
          userInfo?.role === "ROLE_RETRAIT") && (
          <Link to="/withdrawals" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="text"
              sx={{
                justifyContent: "flex-start",
                color: isActive("/withdrawals") ? "#2980b9" : "#2c3e50",
                backgroundColor: isActive("/withdrawals")
                  ? "#dfe6e9"
                  : "transparent",
                "&:hover": { backgroundColor: "#bdc3c7" },
                py: 1.5, // Réduire la hauteur du bouton
                borderRadius: "4px",
                transition: "background-color 0.3s",
              }}
            >
              <AssignmentReturnIcon sx={{ color: "inherit", marginRight: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "capitalize" }}
              >
                Gestion retrait
              </Typography>
            </Button>
          </Link>
        )}

        {/* Gestion Colis */}
        {(userInfo?.role === "ROLE_ADMIN" ||
          userInfo?.role === "ROLE_COLIS") && (
          <Link to="/parcels" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="text"
              sx={{
                justifyContent: "flex-start",
                color: isActive("/parcels") ? "#2980b9" : "#2c3e50",
                backgroundColor: isActive("/parcels")
                  ? "#dfe6e9"
                  : "transparent",
                "&:hover": { backgroundColor: "#bdc3c7" },
                py: 1.5, // Réduire la hauteur du bouton
                borderRadius: "4px",
                transition: "background-color 0.3s",
              }}
            >
              <LocalShippingIcon sx={{ color: "inherit", marginRight: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "capitalize" }}
              >
                Gestion colis
              </Typography>
            </Button>
          </Link>
        )}

        {/* Ajouter Colis */}

        {userInfo?.role === "ROLE_ADMIN" && (
          <Link to="/add-colis" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="text"
              sx={{
                justifyContent: "flex-start",
                color: isActive("/add-colis") ? "#2980b9" : "#2c3e50",
                backgroundColor: isActive("/add-colis")
                  ? "#dfe6e9"
                  : "transparent",
                "&:hover": { backgroundColor: "#bdc3c7" },
                py: 1.5, // Réduire la hauteur du bouton
                borderRadius: "4px",
                transition: "background-color 0.3s",
              }}
            >
              <AddBoxIcon sx={{ color: "inherit", marginRight: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "capitalize" }}
              >
                Ajouter colis
              </Typography>
            </Button>
          </Link>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
