/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface SignUpFormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async ({
    email,
    password,
  }) => {
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password);
      alert("Compte créé avec succès");
    } catch (err: any) {
      setError("Échec de la création du compte. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Créer un compte
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          {/* Email Field */}
          <TextField
            fullWidth
            label="Adresse e-mail"
            margin="normal"
            {...register("email", {
              required: "L'adresse e-mail est requise",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Adresse e-mail invalide",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            autoFocus
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* Submit Button with Loader */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, fontWeight: "bold", backgroundColor: "primary.main" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "S'inscrire"
            )}
          </Button>

          {/* Link to sign in */}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/"
                  style={{ color: "primary.main", textDecoration: "none" }}
                >
                  Connectez-vous ici
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
