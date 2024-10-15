/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

interface WithdrawalFormProps {
  open: boolean;
  onClose: () => void;
  withdrawal: any | null;
  onSave: (withdrawal: any) => void;
  clients: { id: number; name: string }[];
  parcels: { id: number; token: string }[]; // Remplacer `name` par `token`
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  open,
  onClose,
  withdrawal,
  onSave,
  clients,
}) => {
  // Liste des jetons par défaut
  const defaultParcels = [
    { id: 1, token: "JETON123" },
    { id: 2, token: "JETON456" },
    { id: 3, token: "JETON789" },
    { id: 4, token: "JETON101" },
    { id: 5, token: "JETON202" },
  ];

  const [client, setClient] = useState<{ id: number; name: string } | null>(
    null
  );
  const [parcel, setParcel] = useState<{ id: number; token: string } | null>(
    null
  ); // Utiliser `token` au lieu de `name`
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<number>(3); // Statut par défaut : "Retiré"

  useEffect(() => {
    if (withdrawal) {
      setClient(withdrawal.client);
      setParcel(withdrawal.parcel);
      setDate(withdrawal.date);
      setStatus(withdrawal.status);
    } else {
      setClient(null);
      setParcel(null);
      // Date actuelle avec l'heure
      const currentDateTime = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      setDate(currentDateTime);
      setStatus(3); // Statut "Retiré"
    }
  }, [withdrawal]);

  const handleSubmit = () => {
    const newWithdrawal = {
      id: withdrawal ? withdrawal.id : null,
      client,
      parcel,
      date,
      status,
    };
    onSave(newWithdrawal);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {withdrawal ? "Modifier Retrait" : "Ajouter Retrait"}
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          options={clients}
          getOptionLabel={(option) => option.name}
          value={client}
          onChange={(event, newValue) => setClient(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nom du Client"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Autocomplete
          options={defaultParcels} // Utiliser la liste des jetons par défaut
          getOptionLabel={(option) => option.token} // Affiche le jeton du colis
          value={parcel}
          onChange={(event, newValue) => setParcel(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jeton du Colis" // Affiche le jeton du colis
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          label="Date de Retrait"
          type="datetime-local" // Format date + heure
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Statut</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as number)}
          >
            <MenuItem value={3}>Retiré</MenuItem> {/* Statut "Retiré" */}
            <MenuItem value={0}>En stock</MenuItem>
            <MenuItem value={1}>En route</MenuItem>
            <MenuItem value={2}>Expédié</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {withdrawal ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawalForm;
