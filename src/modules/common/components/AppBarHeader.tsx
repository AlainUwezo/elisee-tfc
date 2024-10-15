import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const AppBarHeader = () => {
  const navigate = useNavigate();
  const userName = "Elisée"; // Nom de l'utilisateur à afficher

  const handleLogout = () => {
    // Ici, vous pouvez ajouter votre logique de déconnexion (par exemple, supprimer un token d'authentification)
    navigate("/"); // Redirige vers la page d'accueil
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff", // Fond blanc
        width: `calc(100% - 240px)`,
        ml: "240px",
      }}
      elevation={0}
    >
      <Toolbar>
        {/* Logo et Titre */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Section de l'utilisateur */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon sx={{ color: "#2c3e50", marginRight: 1 }} />
          <Typography
            variant="body1"
            sx={{ color: "#2c3e50", marginRight: 2, fontWeight: "500" }} // Texte sombre
          >
            {userName}
          </Typography>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "#2c3e50",
              "&:hover": {
                color: "#ff4757", // Couleur rouge vif au survol
              },
            }}
            size="small"
            aria-label="Déconnexion"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "#f1f1f1", marginBottom: 1 }} />
    </AppBar>
  );
};

export default AppBarHeader;
