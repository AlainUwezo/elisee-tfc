import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const navigate = useNavigate(); // Hook pour naviguer

  // Fonction de soumission du formulaire
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log("Détails de connexion utilisateur :", data);

    // Simuler une connexion réussie et rediriger vers la page client
    navigate("/parcels"); // Redirection vers la page client
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {/* Icon and title */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Connexion
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          Entrez vos informations pour vous connecter à votre compte. Si vous
          n'avez pas de compte, vous pouvez vous inscrire en cliquant sur le
          lien ci-dessous.
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          {/* Email Field */}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Adresse e-mail"
            autoComplete="email"
            autoFocus
            {...register("email", { required: "L'adresse e-mail est requise" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            fullWidth
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Le mot de passe est requis",
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
          >
            Se connecter
          </Button>

          {/* Link to sign up */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Pas de compte?{" "}
                <a
                  href="/signup"
                  style={{ color: "primary.main", textDecoration: "none" }}
                >
                  Inscrivez-vous
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
