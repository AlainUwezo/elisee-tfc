/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { supabase } from "../../lib/helpers/superbaseClient";

const WithdrawalList: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [withdrawalToDelete, setWithdrawalToDelete] = useState<number | null>(
    null
  );
  const [withdrawalsChanged, setWithdrawalsChanged] = useState<boolean>(false);

  useEffect(() => {
    const loadWithdrawals = async () => {
      const { data, error } = await supabase.from("withdrawals").select("*");

      if (error) {
        console.error("Error fetching withdrawals:", error);
      } else {
        const formattedWithdrawals = data.map(
          (withdrawal: any, index: number) => ({
            id: withdrawal.id || `custom-id-${index}`, // Add a fallback id if withdrawal.id doesn't exist
            client: { name: withdrawal.client_name },
            parcel: { token: withdrawal.parcel_token },
            date: new Date(withdrawal.created_at).toLocaleString(),
            status: withdrawal.status,
          })
        );

        setWithdrawals(formattedWithdrawals);
      }
    };

    loadWithdrawals();
  }, [withdrawalsChanged]);

  const handleOpenForm = (withdrawal: any = null) => {
    setSelectedWithdrawal(withdrawal);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setWithdrawalToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (withdrawalToDelete !== null) {
      const { error } = await supabase
        .from("withdrawals")
        .delete()
        .match({ id: withdrawalToDelete });

      if (error) {
        console.error("Error deleting withdrawal:", error);
      } else {
        setWithdrawals(
          withdrawals.filter(
            (withdrawal) => withdrawal.id !== withdrawalToDelete
          )
        );
        console.log(`Retrait supprimé avec l'ID: ${withdrawalToDelete}`);
      }
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  // Fonction pour obtenir le nouveau statut du colis
  const getParcelStatus = (withdrawalStatus: number) => {
    return withdrawalStatus === 2 ? 3 : 2; // 2 devient 3 (retiré), et 3 devient 2 (expédié)
  };

  const handleStatusChange = async (withdrawal: any) => {
    const newWithdrawalStatus = withdrawal.status === 2 ? 3 : 2; // Changer le statut du retrait
    const newParcelStatus = getParcelStatus(newWithdrawalStatus); // Obtenir le nouveau statut du colis

    // Mettre à jour le statut dans la table withdrawals
    const { error: withdrawalError } = await supabase
      .from("withdrawals")
      .update({ status: newWithdrawalStatus })
      .match({ id: withdrawal.id });

    if (withdrawalError) {
      console.error("Error updating withdrawal status:", withdrawalError);
      return;
    }

    // Mettre à jour le statut du colis dans la table colis
    const { error: parcelError } = await supabase
      .from("colis")
      .update({ statut: newWithdrawalStatus })
      .match({ token: withdrawal.parcel.token });

    if (parcelError) {
      console.error("Error updating parcel status:", parcelError);
      return;
    }

    // Mettre à jour l'état local pour le retrait
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === withdrawal.id ? { ...w, status: newWithdrawalStatus } : w
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return "#fbc02d"; // Couleur pour "Expédié"
      case 3:
        return "#4caf50"; // Couleur pour "Retiré"
      default:
        return "#9e9e9e"; // Couleur pour statut "Inconnu"
    }
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
    {
      field: "status",
      headerName: "Statut",
      width: 150,
      renderCell: (params: any) => {
        const status = params.row.status;
        const statusText =
          status === 2 ? "Expédié" : status === 3 ? "Retiré" : "Inconnu";
        const statusColor = getStatusColor(status);

        return (
          <span
            style={{
              backgroundColor: statusColor,
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params: any) => {
        const { row } = params;
        const buttonText = row.status === 2 ? "Retirer" : "Annuler";
        return (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleStatusChange(row)} // Gérer le changement de statut
            >
              {buttonText}
            </Button>
            <IconButton
              color="error"
              onClick={() => handleDelete(row.id)}
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
        autoHeight
        disableSelectionOnClick
        getRowId={(row) => row.id || row.parcel_token} // Use parcel_token as fallback if id is missing
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          },
        }}
      />

      {/* Dialog for adding/updating withdrawals */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <WithdrawalForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          withdrawal={selectedWithdrawal}
          onSave={(newWithdrawal) => {
            if (selectedWithdrawal) {
              // Update the withdrawal
              setWithdrawals((prev) =>
                prev.map((w) =>
                  w.id === selectedWithdrawal.id ? newWithdrawal : w
                )
              );
            } else {
              setWithdrawalsChanged((prev) => !prev);
            }
          }}
        />
      </Dialog>

      {/* Dialog for delete confirmation */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WithdrawalList;
