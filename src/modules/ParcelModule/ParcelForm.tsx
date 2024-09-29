/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, AttachMoney, Token, MonitorWeight } from "@mui/icons-material";

interface ParcelFormProps {
  open: boolean;
  onClose: () => void;
  parcel: any | null; // Colis à modifier ou null pour un nouvel ajout
  onSave: (parcel: any) => void; // Fonction pour sauvegarder le colis
}

const clients = [
  { id: 1, nom: "Client A", prenom: "Alice" },
  { id: 2, nom: "Client B", prenom: "Bob" },
  { id: 3, nom: "Client C", prenom: "Charlie" },
];

const ParcelForm: React.FC<ParcelFormProps> = ({
  open,
  onClose,
  parcel,
  onSave,
}) => {
  const [nom, setNom] = React.useState("");
  const [poids, setPoids] = React.useState("");
  const [prix, setPrix] = React.useState("");
  const [statut, setStatut] = React.useState(0); // Valeur initiale par défaut
  const [jeton, setJeton] = React.useState("");
  const [client, setClient] = React.useState<any | null>(null); // Client sélectionné

  useEffect(() => {
    if (parcel) {
      setNom(parcel.nom);
      setPoids(parcel.poids);
      setPrix(parcel.prix);
      setStatut(parcel.statut); // Mettre à jour le statut
      setJeton(parcel.jeton);
      const selectedClient = clients.find((c) => c.id === parcel.clientId);
      setClient(selectedClient || null);
    } else {
      setNom("");
      setPoids("");
      setPrix("");
      setStatut(0); // Réinitialiser le statut à "en stock"
      setJeton("");
      setClient(null);
    }
  }, [parcel]);

  const handleSave = () => {
    if (!client) {
      alert("Veuillez sélectionner un client.");
      return;
    }

    const newParcel = {
      nom,
      poids,
      prix,
      statut,
      jeton,
      clientId: client.id, // Ajout de l'ID du client
    };
    onSave(newParcel);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{parcel ? "Modifier Colis" : "Ajouter Colis"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={clients}
              getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
              value={client}
              onChange={(event, newValue) => setClient(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Client"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </Grid>
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
              sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
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
              sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Statut</InputLabel>
              <Select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                label="Statut"
              >
                <MenuItem value={0}>En stock</MenuItem>
                <MenuItem value={1}>En route</MenuItem>
                <MenuItem value={2}>Expédié</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Jeton"
              variant="outlined"
              fullWidth
              margin="normal"
              value={jeton}
              onChange={(e) => setJeton(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Token />
                  </InputAdornment>
                ),
              }}
              sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Fermer
        </Button>
        <Button onClick={handleSave} color="primary">
          {parcel ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParcelForm;
