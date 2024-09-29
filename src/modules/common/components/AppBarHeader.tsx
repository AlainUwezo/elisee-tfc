import {
  AppBar,
  Toolbar,
  Typography,
  //   Avatar,
  Box,
  IconButton,
} from "@mui/material";
import logo from "./../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icône pour le profil
import LogoutIcon from "@mui/icons-material/Logout"; // Icône pour la déconnexion

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
        backgroundColor: "#1a202c",
        width: `calc(100% - 240px)`,
        ml: "240px",
      }}
    >
      <Toolbar>
        {/* Logo et Titre */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
          <Typography variant="h6" noWrap sx={{ color: "#ffdd57" }}>
            Mon Application de Gestion
          </Typography>
        </Box>

        {/* Section de l'utilisateur */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon sx={{ color: "#e2e8f0", marginRight: 1 }} />
          {/* <Avatar
            alt={userName}
            style={{ width: "24px", height: "24px" }}
            src="/static/images/avatar/1.jpg"
            sx={{ marginRight: 1 }}
          /> */}
          <Typography variant="body1" sx={{ color: "#e2e8f0", marginRight: 2 }}>
            {userName}
          </Typography>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "#e2e8f0",
              "&:hover": {
                color: "#ffdd57",
              },
            }}
            size="small"
            aria-label="Déconnexion"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
