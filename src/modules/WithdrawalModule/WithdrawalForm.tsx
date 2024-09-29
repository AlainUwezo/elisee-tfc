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
  parcels: { id: number; name: string }[];
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  open,
  onClose,
  withdrawal,
  onSave,
  clients,
  parcels,
}) => {
  const [client, setClient] = useState<{ id: number; name: string } | null>(
    null
  );
  const [parcel, setParcel] = useState<{ id: number; name: string } | null>(
    null
  );
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (withdrawal) {
      setClient(withdrawal.client);
      setParcel(withdrawal.parcel);
      setDate(withdrawal.date);
      setStatus(withdrawal.status);
    } else {
      setClient(null);
      setParcel(null);
      setDate(new Date().toISOString().split("T")[0]); // Default to today
      setStatus(0); // Default status to "En stock"
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
          options={parcels}
          getOptionLabel={(option) => option.name}
          value={parcel}
          onChange={(event, newValue) => setParcel(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nom du Colis"
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          label="Date"
          type="date"
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
