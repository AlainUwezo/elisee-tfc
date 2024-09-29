/* eslint-disable @typescript-eslint/no-explicit-any */
// WithdrawalList.tsx
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
import WithdrawalForm from "./WithdrawalForm";

const initialWithdrawals = [
  {
    id: 1,
    clientName: "Client A",
    parcelName: "Colis A",
    date: "2024-09-28",
    status: "Retiré",
  },
  {
    id: 2,
    clientName: "Client B",
    parcelName: "Colis B",
    date: "2024-09-29",
    status: "Retiré",
  },
  // Ajoutez plus de retraits si nécessaire
];

const clients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
];

const parcels = [
  { id: 1, name: "Colis A" },
  { id: 2, name: "Colis B" },
];

const WithdrawalList: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [openForm, setOpenForm] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [withdrawalToDelete, setWithdrawalToDelete] = useState<number | null>(
    null
  );

  const handleOpenForm = (withdrawal: any = null) => {
    setSelectedWithdrawal(withdrawal);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setWithdrawalToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (withdrawalToDelete !== null) {
      console.log(`Retrait supprimé avec l'ID: ${withdrawalToDelete}`);
      setWithdrawals(
        withdrawals.filter((withdrawal) => withdrawal.id !== withdrawalToDelete)
      );
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "clientName", headerName: "Nom du Client", width: 150 },
    { field: "parcelName", headerName: "Nom du Colis", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Statut", width: 150 },
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
          Liste des retraits
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nombre de colis: {withdrawals.length}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Ajouter Retrait
        </Button>
      </div>
      <DataGrid
        rows={withdrawals}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      {/* Boîte de dialogue de confirmation de suppression */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce retrait ?
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

      {/* Boîte de dialogue pour le formulaire de retrait */}
      <WithdrawalForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        withdrawal={selectedWithdrawal}
        clients={clients}
        parcels={parcels}
        onSave={(withdrawal) => {
          if (withdrawal.id) {
            // Modifier un retrait existant
            setWithdrawals(
              withdrawals.map((w) => (w.id === withdrawal.id ? withdrawal : w))
            );
          } else {
            // Ajouter un nouveau retrait
            const newWithdrawal = { ...withdrawal, id: withdrawals.length + 1 }; // Exemple d'ajout d'ID
            setWithdrawals([...withdrawals, newWithdrawal]);
          }
          setOpenForm(false);
        }}
      />
    </div>
  );
};

export default WithdrawalList;
