import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Parcel, Client } from "./types"; // Assurez-vous d'importer vos types correctement

interface ViewParcelProps {
  parcel: Parcel;
  client: Client;
  token: string;
  onClose: () => void; // Callback pour fermer la vue
}

const ViewParcel: React.FC<ViewParcelProps> = ({
  parcel,
  client,
  token,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedParcel, setEditedParcel] = useState<Parcel>(parcel);
  const [editedClient, setEditedClient] = useState<Client>(client);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    nomParcel: "",
    poidsParcel: "",
    prixParcel: "",
    nomClient: "",
    emailClient: "",
  });

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
    if (!editedClient.nom) errors.nomClient = "Le nom du client est requis.";
    if (
      !editedClient.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editedClient.email)
    ) {
      errors.emailClient = "L'email n'est pas valide.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    setError(null); // Réinitialiser les erreurs lors de l'édition
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!validateFields()) {
      setError("Veuillez corriger les erreurs avant de continuer.");
      return;
    }

    console.log("Données modifiées :", {
      parcel: editedParcel,
      client: editedClient,
    });
    setIsEditing(false);
  };

  const handleChangeParcel = (field: keyof Parcel, value: string) => {
    setEditedParcel((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeClient = (field: keyof Client, value: string) => {
    setEditedClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (status: number) => {
    setEditedParcel((prev) => ({ ...prev, statut: status }));
  };

  return (
    <div className="border-none">
      <CardHeader
        title="Détails du Colis"
        action={
          <IconButton
            onClick={isEditing ? handleSave : handleEdit}
            color="primary"
          >
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        }
        titleTypographyProps={{ variant: "h5" }}
      />
      <CardContent className="border-none">
        <Box mb={2}>
          <Chip label={`Jeton: ${token}`} color="success" />
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
              <>
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
              </>
            ) : (
              <Typography variant="body1">
                <strong>Nom:</strong> {editedParcel.nom}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {isEditing ? (
              <>
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
              </>
            ) : (
              <Typography variant="body1">
                <strong>Poids:</strong> {editedParcel.poids} kg
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {isEditing ? (
              <>
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
              </>
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
                : "Expédié"}
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
              <Button
                onClick={() => handleStatusChange(2)}
                sx={{
                  backgroundColor:
                    editedParcel.statut === 2 ? "primary.main" : "inherit",
                  color: editedParcel.statut === 2 ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      editedParcel.statut === 2 ? "primary.dark" : "inherit",
                  },
                }}
              >
                Expédié
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
            <Grid item xs={6}>
              {isEditing ? (
                <>
                  <TextField
                    label="Nom"
                    value={editedClient.nom}
                    onChange={(e) => handleChangeClient("nom", e.target.value)}
                    fullWidth
                    required
                    size="small"
                    error={!!fieldErrors.nomClient}
                    helperText={fieldErrors.nomClient}
                  />
                </>
              ) : (
                <Typography variant="body1">
                  <strong>Nom:</strong> {editedClient.nom}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {isEditing ? (
                <>
                  <TextField
                    label="Email"
                    value={editedClient.email}
                    onChange={(e) =>
                      handleChangeClient("email", e.target.value)
                    }
                    fullWidth
                    required
                    size="small"
                    error={!!fieldErrors.emailClient}
                    helperText={fieldErrors.emailClient}
                  />
                </>
              ) : (
                <Typography variant="body1">
                  <strong>Email:</strong> {editedClient.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {isEditing ? (
                <TextField
                  label="Téléphone"
                  value={editedClient.telephone}
                  size="small"
                  onChange={(e) =>
                    handleChangeClient("telephone", e.target.value)
                  }
                  fullWidth
                  required
                />
              ) : (
                <Typography variant="body1">
                  <strong>Téléphone:</strong> {editedClient.telephone}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {isEditing ? (
                <TextField
                  label="Expéditeur"
                  size="small"
                  value={editedClient.expediteur}
                  onChange={(e) =>
                    handleChangeClient("expediteur", e.target.value)
                  }
                  fullWidth
                  required
                />
              ) : (
                <Typography variant="body1">
                  <strong>Expéditeur:</strong> {editedClient.expediteur}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </div>
  );
};

export default ViewParcel;
