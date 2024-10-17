import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import Logo from "./../../assets/logo.png";

const Header = () => {
  return (
    <AppBar position="static" elevation={0} className="bg-white pt-6">
      <Toolbar className="flex justify-between">
        {/* Left: Logo et titre */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-10" />
          <Typography className="text-black font-bold text-xl">
            E-Trans
          </Typography>
        </div>

        {/* Right: Boutons de navigation et déconnexion */}
        <div className="flex items-center space-x-4">
          {/* Lien vers la page de Demande de Prêt avec icône */}
          <Button
            component={Link}
            to="/check-parcel"
            className="text-black capitalize flex items-center hover:bg-gray-100 p-2 rounded-lg"
          >
            <DeliveryDiningIcon className="mr-2" />
            Suivre colis
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
