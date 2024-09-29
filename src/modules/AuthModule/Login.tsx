import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
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
    navigate("/clients"); // Redirection vers la page client
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
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Icon and title */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
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
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
