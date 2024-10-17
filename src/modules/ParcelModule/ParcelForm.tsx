/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
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

interface EditParcelDialogProps {
  open: boolean;
  onClose: () => void;
  parcel: any; // Remplacer par votre type de données
  onSave: (parcel: any) => void; // Remplacer par votre type de données
}

const EditParcelDialog: React.FC<EditParcelDialogProps> = ({
  open,
  onClose,
  parcel,
  onSave,
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

  useEffect(() => {
    if (parcel) {
      setNom(parcel.nom);
      setPoids(parcel.poids);
      setPrix(parcel.prix);
      setStatut(parcel.statut);
      setClientNom(parcel.client.nom);
      setClientEmail(parcel.client.email);
      setClientTelephone(parcel.client.telephone);
      setExpediteurNom(parcel.client.expediteur);
      setClientAdresse(parcel.client.adresse);
    }
  }, [parcel]);

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

    const updatedParcel = {
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

    console.log("Colis modifié:", updatedParcel);
    onSave(updatedParcel);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier le Colis</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Mettre à Jour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditParcelDialog;
