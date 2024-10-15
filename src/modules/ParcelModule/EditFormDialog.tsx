/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add,
  AttachMoney,
  MonitorWeight,
  Person,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

// Les props que nous allons recevoir
interface EditFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any; // Données initiales pour l'édition
}

const EditFormDialog: React.FC<EditFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
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

  // Utiliser les props initiales pour remplir les champs lors de l'édition
  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom || "");
      setPoids(initialData.poids || "");
      setPrix(initialData.prix || "");
      setStatut(initialData.statut || 0);
      setClientNom(initialData.client?.nom || "");
      setClientEmail(initialData.client?.email || "");
      setClientTelephone(initialData.client?.telephone || "");
      setExpediteurNom(initialData.client?.expediteur || "");
      setClientAdresse(initialData.client?.adresse || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
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

    const newParcel = {
      nom,
      poids,
      prix,
      statut,
      client: {
        nom: clientNom,
        email: clientEmail,
        telephone: clientTelephone,
        expediteur: expediteurNom,
        adresse: clientAdresse,
      },
    };

    console.log("Colis soumis:", newParcel);
    onSubmit(newParcel); // Appeler la fonction de soumission
    onClose(); // Fermer le dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier le Colis</DialogTitle>
      <DialogContent>
        <Paper
          elevation={0}
          sx={{ padding: 3, maxWidth: 600, margin: "auto", borderRadius: 2 }}
        >
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            sx={{ marginBottom: 2 }}
          >
            Veuillez remplir les informations du colis et du client.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                  <MenuItem value={2}>Expédié</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
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
                label="Nom de l'Expéditeur"
                variant="outlined"
                fullWidth
                margin="normal"
                value={expediteurNom}
                onChange={(e) => setExpediteurNom(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Soumettre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFormDialog;
