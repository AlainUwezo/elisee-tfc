/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Person, Email, Home } from "@mui/icons-material";

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  client?: {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
  };
  onSave: (client: {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
  }) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  open,
  onClose,
  client,
  onSave,
}) => {
  const { register, handleSubmit, reset } = useForm();

  // Reset le formulaire lorsque le formulaire s'ouvre ou qu'un client est sélectionné
  React.useEffect(() => {
    if (open) {
      reset(client);
    }
  }, [open, client, reset]);

  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {client ? "Modifier le Client" : "Ajouter un Client"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nom"
            fullWidth
            margin="normal"
            {...register("nom", { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Prénom"
            fullWidth
            margin="normal"
            {...register("prenom", { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            {...register("email", { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Adresse"
            fullWidth
            margin="normal"
            {...register("adresse", { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="action" />
                </InputAdornment>
              ),
            }}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Fermer
            </Button>
            <Button type="submit" color="primary">
              {client ? "Modifier" : "Ajouter"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientForm;
