/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import de l'icône de suppression
import { useNavigate } from "react-router-dom";
import ViewParcel from "./ViewParcel"; // Importez le composant ViewParcel
import { Add } from "@mui/icons-material";

const initialParcels = [
  {
    id: 1,
    nom: "Colis A",
    poids: 2.5,
    prix: 20,
    statut: 1,
    jeton: "XYZ123",
    clientId: 1,
  },
  {
    id: 2,
    nom: "Colis B",
    poids: 1.2,
    prix: 15,
    statut: 2,
    jeton: "ABC456",
    clientId: 2,
  },
  {
    id: 3,
    nom: "Colis C",
    poids: 3.0,
    prix: 25,
    statut: 2,
    jeton: "DEF789",
    clientId: 3,
  },
  {
    id: 4,
    nom: "Colis D",
    poids: 2.0,
    prix: 30,
    statut: 0,
    jeton: "GHI012",
    clientId: 4,
  },
  // Ajoutez plus de colis si nécessaire
];

interface Parcel {
  id: number;
  nom: string;
  poids: number;
  prix: number;
  statut: number;
  jeton: string;
  clientId: number;
}

const ParcelList: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>(initialParcels);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<number | null>(null);
  const [openViewParcel, setOpenViewParcel] = useState(false);
  const [selectedParcelDetails, setSelectedParcelDetails] =
    useState<Parcel | null>(null);

  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setParcelToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (parcelToDelete !== null) {
      setParcels(parcels.filter((parcel) => parcel.id !== parcelToDelete));
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleViewParcel = (parcel: Parcel) => {
    setSelectedParcelDetails(parcel);
    setOpenViewParcel(true);
  };

  const handleAddParcel = () => {
    navigate("/add-colis");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "poids", headerName: "Poids (kg)", type: "number", width: 120 },
    { field: "prix", headerName: "Prix ($)", type: "number", width: 120 },
    {
      field: "jeton",
      headerName: "Jeton",
      width: 150,
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 120,
      renderCell: (params: any) => (
        <Typography variant="body2" className="pt-3">
          {params.value === 0
            ? "En stock"
            : params.value === 1
            ? "En route"
            : "Expédié"}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <>
          {/* Bouton supprimé */}
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: "10px" }}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleViewParcel(params.row)}
          >
            Voir Détails
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 p-4">
      <div className="mb-4 flex justify-between items-center">
        <Typography variant="h6" className="font-bold">
          Colis ({parcels.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          className="capitalize"
          onClick={() => handleAddParcel()}
        >
          Ajouter Colis
        </Button>
      </div>
      <DataGrid
        rows={parcels}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        disableSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row": {
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          },
        }}
      />

      {/* Boîte de dialogue de confirmation de suppression */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce colis ?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour voir les détails du colis */}
      <Dialog open={openViewParcel} onClose={() => setOpenViewParcel(false)}>
        <DialogContent>
          {selectedParcelDetails && (
            <ViewParcel
              parcel={selectedParcelDetails}
              client={{
                nom: "Client A",
                email: "client@example.com",
                telephone: "0123456789",
                expediteur: "Expéditeur A",
                adresse: "123 Rue de Paris",
              }} // Remplacez par les données du client appropriées
              token={selectedParcelDetails.jeton}
              onClose={() => setOpenViewParcel(false)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewParcel(false)} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParcelList;
