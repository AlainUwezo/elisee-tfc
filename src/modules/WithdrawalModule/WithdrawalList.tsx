/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import WithdrawalForm from "./WithdrawalForm";
import DeleteIcon from "@mui/icons-material/Delete"; // Import de l'icône de suppression
import { Add } from "@mui/icons-material";

const initialWithdrawals = [
  {
    id: 1,
    client: { id: 1, name: "Client A" },
    parcel: { id: 1, token: "JETON123" },
    date: "2024-09-28T14:00:00",
    status: 3,
  },
  {
    id: 2,
    client: { id: 2, name: "Client B" },
    parcel: { id: 2, token: "JETON456" },
    date: "2024-09-29T15:30:00",
    status: 3,
  },
  // Ajoutez plus de retraits si nécessaire
];

const clients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
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
    {
      field: "client",
      headerName: "Nom du Client",
      width: 150,
      renderCell: (params: any) => params.row.client?.name || "Inconnu",
    },
    {
      field: "parcel",
      headerName: "Jeton du Colis",
      width: 150,
      renderCell: (params: any) => params.row.parcel?.token || "Inconnu",
    },
    { field: "date", headerName: "Date", width: 180 },
    { field: "status", headerName: "Statut", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenForm(row)} // Passer la ligne sélectionnée pour modifier
            >
              Modifier
            </Button>
            <IconButton
              color="error"
              onClick={() => handleDelete(row.id)} // Passer l'ID de la ligne sélectionnée pour supprimer
              style={{ marginLeft: "10px" }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 p-4">
      <div className="mb-4 flex justify-between items-center">
        <Typography variant="h6" className="font-bold">
          Liste des retraits ({withdrawals.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          className="capitalize"
          onClick={() => handleOpenForm()} // Ouvrir le formulaire pour ajouter un retrait
        >
          Ajouter Retrait
        </Button>
      </div>
      <DataGrid
        rows={withdrawals}
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
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour le formulaire de retrait */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <WithdrawalForm
          parcels={[]} // Passez ici les parcelles appropriées
          open={openForm}
          onClose={() => setOpenForm(false)}
          withdrawal={selectedWithdrawal}
          onSave={(withdrawal) => {
            if (withdrawal.id) {
              // Modifier un retrait existant
              setWithdrawals(
                withdrawals.map((w) =>
                  w.id === withdrawal.id ? withdrawal : w
                )
              );
            } else {
              // Ajouter un nouveau retrait
              const newWithdrawal = {
                ...withdrawal,
                id: withdrawals.length + 1,
              };
              setWithdrawals([...withdrawals, newWithdrawal]);
            }
            setOpenForm(false);
          }}
          clients={clients}
        />
      </Dialog>
    </div>
  );
};

export default WithdrawalList;
