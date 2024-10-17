/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress, // Importer CircularProgress pour le loader
} from "@mui/material";
import {
  Add,
  AttachMoney,
  MonitorWeight,
  Person,
  Email,
  Phone,
} from "@mui/icons-material";
import PageContainer from "../common/layouts/PageContainer";
import { supabase } from "../../lib/helpers/superbaseClient";

// Fonction pour générer un jeton unique de 8 caractères
const generateUniqueToken = (clientName: string): string => {
  const timestamp = Date.now().toString(36); // Conversion de l'horodatage en base 36
  const clientHash = clientName.slice(0, 4).toLowerCase().padEnd(4, "x"); // Prendre les 4 premiers caractères du nom du client

  return (timestamp + clientHash).slice(0, 8); // Retourner les 8 premiers caractères
};

const AjoutColis: React.FC = () => {
  const [nom, setNom] = useState("");
  const [poids, setPoids] = useState("");
  const [prix, setPrix] = useState("");
  const [statut, setStatut] = useState(0);

  const [clientNom, setClientNom] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTelephone, setClientTelephone] = useState("");
  const [expediteurNom, setExpediteurNom] = useState("");
  const [clientAdresse, setClientAdresse] = useState("");

  const [errors, setErrors] = useState({
    nom: "",
    poids: "",
    prix: "",
    clientNom: "",
    clientEmail: "",
    clientTelephone: "",
    expediteurNom: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false); // État pour gérer le loader

  const handleSubmit = async () => {
    const newErrors = {
      nom: "",
      poids: "",
      prix: "",
      clientNom: "",
      clientEmail: "",
      clientTelephone: "",
      expediteurNom: "",
    };

    // Validation pour les détails du colis
    if (!nom) newErrors.nom = "Veuillez remplir le nom.";
    if (!poids) newErrors.poids = "Veuillez remplir le poids.";
    if (!prix) newErrors.prix = "Veuillez remplir le prix.";

    // Validation pour les détails du client
    if (!clientNom) newErrors.clientNom = "Veuillez entrer le nom du client.";
    if (!clientEmail)
      newErrors.clientEmail = "Veuillez entrer l'email du client.";
    if (!clientTelephone)
      newErrors.clientTelephone = "Veuillez entrer le téléphone du client.";
    if (!expediteurNom)
      newErrors.expediteurNom = "Veuillez entrer le nom de l'expéditeur.";

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    const jeton = generateUniqueToken(clientNom); // Générer le jeton unique
    const newParcel = {
      nom,
      poids,
      prix,
      statut,
      token: `${jeton}`,
      client_nom: clientNom,
      client_email: clientEmail,
      client_telephone: clientTelephone,
      expediteur_nom: expediteurNom,
      adresse: clientAdresse,
    };

    console.log(newParcel);

    setLoading(true); // Activer le loader

    const { data, error } = await supabase.from("colis").insert([newParcel]);

    setLoading(false); // Désactiver le loader

    if (error) {
      console.error("Erreur lors de l'ajout du colis:", error);
      return;
    }

    console.log("Colis ajouté:", data);
    setSuccessMessage("Colis ajouté avec succès !");
    setOpenSnackbar(true);

    // Réinitialiser le formulaire
    setNom("");
    setPoids("");
    setPrix("");
    setStatut(0);
    setClientNom("");
    setClientEmail("");
    setClientTelephone("");
    setExpediteurNom("");
    setClientAdresse("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer>
      <Paper
        elevation={0}
        sx={{ padding: 3, maxWidth: 1200, margin: "auto", borderRadius: 2 }}
      >
        <Typography
          variant="h5" // Adjusted for better title presentation
          className="font-bold"
          gutterBottom
          align="center"
        >
          Ajouter un Colis
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="center"
          sx={{ marginBottom: 2 }}
        >
          Veuillez remplir les informations du colis et du client.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Informations du Colis
            </Typography>
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Add />
                  </InputAdornment>
                ),
              }}
              error={!!errors.nom}
              helperText={errors.nom}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Poids"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonitorWeight />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.poids}
                  helperText={errors.poids}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Prix"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.prix}
                  helperText={errors.prix}
                />
              </Grid>
            </Grid>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Statut</InputLabel>
              <Select
                value={statut}
                onChange={(e) => setStatut(+e.target.value)}
                label="Statut"
              >
                <MenuItem value={0}>En stock</MenuItem>
                <MenuItem value={1}>En route</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Informations du Client
            </Typography>
            <TextField
              label="Nom du Client"
              variant="outlined"
              fullWidth
              margin="normal"
              value={clientNom}
              onChange={(e) => setClientNom(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              error={!!errors.clientNom}
              helperText={errors.clientNom}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              error={!!errors.clientEmail}
              helperText={errors.clientEmail}
              type="email"
            />
            <TextField
              label="Téléphone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={clientTelephone}
              onChange={(e) => setClientTelephone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              error={!!errors.clientTelephone}
              helperText={errors.clientTelephone}
              type="tel"
            />
            <TextField
              label="Nom de l'expéditeur"
              variant="outlined"
              fullWidth
              margin="normal"
              value={expediteurNom}
              onChange={(e) => setExpediteurNom(e.target.value)}
              error={!!errors.expediteurNom}
              helperText={errors.expediteurNom}
            />
            <TextField
              label="Adresse"
              variant="outlined"
              fullWidth
              margin="normal"
              value={clientAdresse}
              onChange={(e) => setClientAdresse(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Affichage du loader pendant la soumission */}
        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <CircularProgress />
            <Typography variant="body1">En cours de soumission...</Typography>
          </div>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading} // Désactiver le bouton pendant la soumission
        >
          Ajouter le Colis
        </Button>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AjoutColis;
