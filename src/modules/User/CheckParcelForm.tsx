import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { supabase } from "../../lib/helpers/superbaseClient";

// Définition du type pour le statut du colis
interface PackageStatus {
  statut: number;
  description: string;
  nom: string;
  client_nom: string;
  client_expediteur: string;
  client_telephone: string;
  created_at: string;
}

// Fonction pour convertir un statut en chaîne lisible
const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "En stock";
    case 1:
      return "En route";
    case 2:
      return "Expédié";
    case 3:
      return "Retiré";
    default:
      return "Inconnu";
  }
};

const CheckParcelForm: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<PackageStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from("colis").select("*");
    if (error) {
      console.error("Erreur lors de la récupération des colis :", error);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPackageStatus = async (token: string) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("colis")
      .select("*")
      .eq("token", token)
      .single();
    console.log("Bonjour Alain");

    if (error || !data) {
      setError("Colis non trouvé ou erreur lors de la récupération.");
      setLoading(false);
      return;
    }

    // Si les données sont récupérées avec succès
    setStatus({
      statut: data.statut,
      description: getStatusText(data.statut),
      nom: data.nom,
      client_nom: data.client_nom,
      client_expediteur: data.expediteur_nom,
      client_telephone: data.client_telephone,
      created_at: data.created_at,
    });

    setLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPackageStatus(token);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper elevation={0} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Suivi de votre colis
          </Typography>
          <Typography variant="body1" gutterBottom>
            Entrez le jeton de votre colis pour obtenir son statut.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Jeton du colis"
              variant="outlined"
              value={token}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<LocalShippingIcon />}
              disabled={loading}
            >
              Vérifier le statut
            </Button>
          </form>

          {loading && (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {status && (
            <Box mt={4} p={2} style={{ backgroundColor: "#f9f9f9" }}>
              <Typography variant="h5">
                <CheckCircleIcon color="success" /> Statut du colis :{" "}
                {status.description}
              </Typography>
              <Typography variant="body1" mt={2}>
                <strong>Nom du colis : </strong> {status.nom}
              </Typography>
              <Typography variant="body1">
                <strong>Nom du destinataire : </strong> {status.client_nom}
              </Typography>
              <Typography variant="body1">
                <strong>Nom de l'expéditeur : </strong>{" "}
                {status.client_expediteur}
              </Typography>
              <Typography variant="body1">
                <strong>Téléphone : </strong> {status.client_telephone}
              </Typography>
              <Typography variant="body1">
                <strong>Date : </strong>{" "}
                {new Date(status.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CheckParcelForm;
