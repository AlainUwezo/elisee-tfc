import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../../contexts/AuthContext";

const AppBarHeader = () => {
  const navigate = useNavigate();
  const { user, userInfo, signOut } = useAuth();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenConfirmDialog(true);
  };

  // Fonction pour gérer la confirmation de la déconnexion
  const handleConfirmLogout = async () => {
    setOpenConfirmDialog(false); // Fermer le dialogue
    try {
      await signOut(); // Appeler la fonction de déconnexion
      navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  // Fonction pour fermer le dialogue sans déconnexion
  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <>
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
              {userInfo?.user_name ?? "Utilisateur"}{" "}
              {/* Afficher le nom de l'utilisateur connecté */}
            </Typography>
            <IconButton
              onClick={handleLogoutClick} // Ouvre le dialogue de confirmation
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

      {/* Dialog de confirmation */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog} // Ferme le dialogue si l'utilisateur annule
        aria-labelledby="confirm-logout-dialog-title"
      >
        <DialogTitle id="confirm-logout-dialog-title">
          Confirmation de déconnexion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary" autoFocus>
            Se déconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBarHeader;
