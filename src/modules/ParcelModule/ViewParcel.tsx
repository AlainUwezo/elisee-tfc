/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  Grid,
  Paper,
  TextField,
  ButtonGroup,
  IconButton,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Parcel } from "./types"; // Assurez-vous d'importer vos types correctement
import { supabase } from "../../lib/helpers/superbaseClient";
import axios from "axios";

interface ViewParcelProps {
  parcel: Parcel;
  token: string;
  onClose: () => void;
  setParcelsChange: (prev: any) => void;
}

const ViewParcel: React.FC<ViewParcelProps> = ({
  parcel,
  token,
  onClose,
  setParcelsChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedParcel, setEditedParcel] = useState<Parcel>(parcel);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    nomParcel: "",
    poidsParcel: "",
    prixParcel: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Colis", parcel);
  }, [parcel]);

  // Valider les champs
  const validateFields = () => {
    let errors: any = {};
    if (!editedParcel.nom) errors.nomParcel = "Le nom est requis.";
    if (
      !editedParcel.poids ||
      isNaN(Number(editedParcel.poids)) ||
      Number(editedParcel.poids) <= 0
    ) {
      errors.poidsParcel = "Le poids doit être un nombre positif.";
    }
    if (
      !editedParcel.prix ||
      isNaN(Number(editedParcel.prix)) ||
      Number(editedParcel.prix) < 0
    ) {
      errors.prixParcel = "Le prix doit être un nombre positif ou zéro.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    setError(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validateFields()) {
      setError("Veuillez corriger les erreurs avant de continuer.");
      return;
    }
    setLoading(true);

    const {
      id,
      nom,
      poids,
      prix,
      statut,
      client_nom,
      client_email,
      expediteur_nom,
      adresse,
    } = editedParcel;

    const { error } = await supabase
      .from("colis")
      .update({
        nom,
        poids,
        prix,
        statut,
        client_nom,
        client_email,
        expediteur_nom,
        adresse,
      })
      .eq("id", id);

    if (error) {
      setLoading(false);
      setError("Une erreur est survenue lors de la mise à jour du colis.");
      console.error("Erreur de mise à jour :", error);
      return;
    }

    // Envoi de l'email de suivi après la mise à jour via axios
    try {
      const response = await axios.post(
        "http://localhost:3000/send-tracking-update",
        {
          to: client_email,
          token: parcel.token,
          status:
            statut === 0 ? "En stock" : statut === 1 ? "En route" : "Retiré",
          clientName: client_nom,
          estimatedArrival: new Date().toLocaleDateString(),
        }
      );

      if (response.status !== 200) {
        throw new Error("Erreur lors de l'envoi de l'email de suivi.");
      }

      console.log(response.data); // Message de succès de l'API
      setIsEditing(false);
    } catch (mailError) {
      console.error("Erreur lors de l'envoi de l'email de suivi :", mailError);
      setError("Erreur lors de l'envoi de l'email de suivi.");
    } finally {
      setLoading(false);
    }

    console.log("Données modifiées :", editedParcel);
    onClose();
    setParcelsChange((prev: any) => !prev);
  };

  const handleChangeParcel = (field: keyof Parcel, value: string) => {
    setEditedParcel((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (status: number) => {
    setEditedParcel((prev) => ({ ...prev, statut: status }));
  };

  return (
    <div className="border-none">
      <CardHeader
        title="Détails du Colis"
        action={
          parcel.statut === 0 && (
            <IconButton
              onClick={isEditing ? handleSave : handleEdit}
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isEditing ? (
                <SaveIcon />
              ) : (
                <EditIcon />
              )}
            </IconButton>
          )
        }
        titleTypographyProps={{ variant: "h5" }}
      />
      <CardContent className="border-none">
        <Box mb={2}>
          <Chip label={`Jeton: ${parcel.token}`} color="success" />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Divider sx={{ marginY: 2 }} />

        {/* Parcel Information */}
        <Typography
          variant="body1"
          className="text-slate-500 mb-5"
          gutterBottom
        >
          Informations du Colis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {isEditing ? (
              <TextField
                label="Nom"
                value={editedParcel.nom}
                onChange={(e) => handleChangeParcel("nom", e.target.value)}
                fullWidth
                required
                size="small"
                error={!!fieldErrors.nomParcel}
                helperText={fieldErrors.nomParcel}
              />
            ) : (
              <Typography variant="body1">
                <strong>Nom:</strong> {editedParcel.nom}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {isEditing ? (
              <TextField
                label="Poids"
                value={editedParcel.poids}
                onChange={(e) => handleChangeParcel("poids", e.target.value)}
                fullWidth
                size="small"
                required
                error={!!fieldErrors.poidsParcel}
                helperText={fieldErrors.poidsParcel}
              />
            ) : (
              <Typography variant="body1">
                <strong>Poids:</strong> {editedParcel.poids} kg
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {isEditing ? (
              <TextField
                label="Prix"
                value={editedParcel.prix}
                onChange={(e) => handleChangeParcel("prix", e.target.value)}
                fullWidth
                size="small"
                required
                error={!!fieldErrors.prixParcel}
                helperText={fieldErrors.prixParcel}
              />
            ) : (
              <Typography variant="body1">
                <strong>Prix:</strong> ${editedParcel.prix}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Statut:</strong>{" "}
              {editedParcel.statut === 0
                ? "En stock"
                : editedParcel.statut === 1
                ? "En route"
                : editedParcel.statut === 2
                ? "Expédié"
                : "Retiré"}
            </Typography>
          </Grid>
        </Grid>

        {isEditing && (
          <Box mt={2}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => handleStatusChange(0)}
                sx={{
                  backgroundColor:
                    editedParcel.statut === 0 ? "primary.main" : "inherit",
                  color: editedParcel.statut === 0 ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      editedParcel.statut === 0 ? "primary.dark" : "inherit",
                  },
                }}
              >
                En stock
              </Button>
              <Button
                onClick={() => handleStatusChange(1)}
                sx={{
                  backgroundColor:
                    editedParcel.statut === 1 ? "primary.main" : "inherit",
                  color: editedParcel.statut === 1 ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      editedParcel.statut === 1 ? "primary.dark" : "inherit",
                  },
                }}
              >
                En route
              </Button>
            </ButtonGroup>
          </Box>
        )}

        <Divider sx={{ marginY: 2 }} />

        {/* Client Information */}
        <Typography
          variant="body1"
          className="text-slate-500 mb-5"
          gutterBottom
        >
          Informations du client
        </Typography>
        <Paper elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Nom:</strong> {editedParcel.client_nom}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Email:</strong> {editedParcel.client_email}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Téléphone:</strong> {editedParcel.client_telephone}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ marginY: 2 }} />

        {/* Expediteur Information */}
        <Typography
          variant="body1"
          className="text-slate-500 mb-5"
          gutterBottom
        >
          Informations de l'expéditeur
        </Typography>
        <Paper elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Nom:</strong> {editedParcel.expediteur_nom}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Adresse:</strong> {editedParcel.adresse}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </div>
  );
};

export default ViewParcel;
