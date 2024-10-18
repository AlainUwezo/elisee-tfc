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
  CircularProgress, // Importez CircularProgress
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { supabase } from "../../lib/helpers/superbaseClient";
import axios from "axios"; // Importez axios pour l'envoi d'e-mail

interface WithdrawalFormProps {
  open: boolean;
  onClose: () => void;
  withdrawal: any | null;
  onSave: (withdrawal: any) => void;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  open,
  onClose,
  withdrawal,
  onSave,
}) => {
  const [parcels, setParcels] = useState<
    {
      id: number;
      token: string;
      client_nom: string;
      client_email: string; // Ajoutez l'email du client
    }[]
  >([]);
  const [parcel, setParcel] = useState<{
    id: number;
    token: string;
    client_nom: string;
    client_email: string; // Ajoutez l'email du client
  } | null>(null);
  const [clientName, setClientName] = useState<string>(""); // État pour le nom du client
  const [status, setStatus] = useState<number>(2); // Statut par défaut : "Expédié"
  const [loading, setLoading] = useState<boolean>(false); // État pour le loader

  useEffect(() => {
    const loadParcels = async () => {
      const { data: parcels, error } = await supabase
        .from("colis")
        .select("id, token, client_nom, client_email") // Récupérez l'email du client
        .neq("statut", 2)
        .neq("statut", 3);

      if (error) {
        console.error("Error fetching parcels:", error);
        return [];
      }
      setParcels(parcels);
    };

    loadParcels();
  }, []);

  useEffect(() => {
    if (withdrawal) {
      setParcel(withdrawal.parcel);
      setClientName(withdrawal.client_name); // Assurez-vous de mettre à jour le nom du client
      setStatus(withdrawal.status);
    } else {
      setParcel(null);
      setClientName(""); // Réinitialiser le nom du client
      setStatus(3); // Statut "Expédié"
    }
  }, [withdrawal]);

  const handleParcelChange = (event: any, newValue: any) => {
    setParcel(newValue);
    if (newValue) {
      setClientName(newValue.client_nom);
    } else {
      setClientName("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Démarrer le loader
    const newWithdrawal = {
      parcel_token: parcel?.token,
      client_name: clientName, // Utilisez le nom du client mis à jour
      status,
    };

    // Insérer ou mettre à jour le retrait
    const { data, error } = await supabase
      .from("withdrawals")
      .insert([newWithdrawal]);

    if (error) {
      console.error("Error adding withdrawal:", error);
      setLoading(false); // Arrêter le loader en cas d'erreur
      return;
    }

    // Mettre à jour le statut du colis
    const parcelUpdate = await supabase
      .from("colis")
      .update({ statut: status }) // Assurez-vous que le nom de la colonne est correct
      .eq("token", parcel?.token); // Met à jour le colis avec le jeton concerné

    if (parcelUpdate.error) {
      console.error("Error updating parcel status:", parcelUpdate.error);
    } else {
      console.log("Parcel status updated:", parcelUpdate.data);

      try {
        const response = await axios.post(
          "http://localhost:3000/send-tracking-update",
          {
            to: parcel?.client_email,
            token: parcel?.token,
            status: status === 2 ? "Expédié" : "Retiré",
            clientName: parcel?.client_nom,
            estimatedArrival: new Date().toLocaleDateString(),
          }
        );

        if (response.status !== 200) {
          throw new Error("Erreur lors de l'envoi de l'email de suivi.");
        }

        console.log(response.data); // Message de succès de l'API
      } catch (mailError) {
        console.error(
          "Erreur lors de l'envoi de l'email de suivi :",
          mailError
        );
      } finally {
        setLoading(false);
      }
    }

    console.log("Withdrawal added:", data);
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
          options={parcels} // Utiliser les jetons de colis récupérés depuis Supabase
          getOptionLabel={(option) => option.token}
          value={parcel}
          onChange={handleParcelChange} // Utiliser la fonction pour mettre à jour le nom du client
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jeton du Colis"
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          value={clientName} // Affichez le nom du client associé au jeton
          margin="normal"
          disabled
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Statut</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as number)}
          >
            <MenuItem value={2}>Expédié</MenuItem>
            <MenuItem value={3}>Retiré</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={loading} // Désactiver le bouton pendant le chargement
          endIcon={loading ? <CircularProgress size={20} /> : null} // Afficher le loader
        >
          {withdrawal ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawalForm;
