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
} from "@mui/material";
import ParcelForm from "./ParcelForm";

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
  // Ajoutez plus de colis si nécessaire
];

const ParcelList: React.FC = () => {
  const [parcels, setParcels] = useState(initialParcels);
  const [openForm, setOpenForm] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<number | null>(null);

  const handleOpenForm = (parcel: any = null) => {
    setSelectedParcel(parcel);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setParcelToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (parcelToDelete !== null) {
      console.log(`Client supprimé avec l'ID: ${parcelToDelete}`);
      setParcels(parcels.filter((parcel) => parcel.id !== parcelToDelete));
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "poids", headerName: "Poids (kg)", type: "number", width: 120 },
    { field: "prix", headerName: "Prix ($)", type: "number", width: 120 },
    { field: "statut", headerName: "Statut", width: 120 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params: any) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleOpenForm(params.row)}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: "10px" }}
          >
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1">
      <div className="mb-4">
        <Typography variant="h4" gutterBottom>
          Liste des colis
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nombre de colis: {parcels.length}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Ajouter Colis
        </Button>
      </div>
      <DataGrid
        rows={parcels}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
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
          <Button onClick={confirmDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour le formulaire de colis */}
      <ParcelForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        parcel={selectedParcel}
        onSave={(parcel) => {
          if (parcel.id) {
            // Modifier un colis existant
            setParcels(parcels.map((p) => (p.id === parcel.id ? parcel : p)));
          } else {
            // Ajouter un nouveau colis
            const newParcel = { ...parcel, id: parcels.length + 1 }; // Exemple d'ajout d'ID
            setParcels([...parcels, newParcel]);
          }
          setOpenForm(false);
        }}
      />
    </div>
  );
};

export default ParcelList;
