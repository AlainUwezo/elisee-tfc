/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Avatar,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom"; // Importation de useNavigate

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn, userInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialisation du hook de navigation

  const onSubmit: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);

      //   if (userInfo?.role === "ROLE_ADMIN") {
      //     navigate("/dashboard");
      //   } else {
      //     if (userInfo?.role === "ROLE_RETRAIT") {
      //       navigate("/withdrawals");
      //     } else {
      //       if (userInfo?.role === "ROLE_COLIS") {
      //         navigate("/parcels");
      //       } else {
      navigate("/");
      //   }
      // }
      //   }
    } catch (err: any) {
      setError(
        "Impossible de se connecter. Veuillez vérifier vos identifiants."
      );
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
        {/* Icon and Title */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Connexion
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Entrez vos informations pour accéder à votre compte.
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
              "Se connecter"
            )}
          </Button>

          {/* Link to sign up */}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Vous n'avez pas de compte ?{" "}
                <Link
                  to="/signup"
                  style={{ color: "primary.main", textDecoration: "none" }}
                >
                  Inscrivez-vous ici
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
