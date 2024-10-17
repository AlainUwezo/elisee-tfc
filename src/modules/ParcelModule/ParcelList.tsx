/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ViewParcel from "./ViewParcel";
import { Add } from "@mui/icons-material";
import { supabase } from "../../lib/helpers/superbaseClient";

interface Parcel {
  id: number;
  nom: string;
  poids: number;
  prix: number;
  statut: number;
  token: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  expediteur_nom: string;
  adresse: string;
}

const ParcelList: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<number | null>(null);
  const [openViewParcel, setOpenViewParcel] = useState(false);
  const [selectedParcelDetails, setSelectedParcelDetails] =
    useState<Parcel | null>(null);
  const [loading, setLoading] = useState(true);
  const [parcelsChanged, setParcelsChanged] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("colis").select("*");

      if (error) {
        console.error("Erreur lors de la récupération des colis:", error);
      } else {
        setParcels(data);
      }
      setLoading(false);
    };
    fetchParcels();
  }, [parcelsChanged]);

  const handleDelete = (id: number) => {
    setParcelToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (parcelToDelete !== null) {
      const { error } = await supabase
        .from("colis")
        .delete()
        .match({ id: parcelToDelete });

      if (error) {
        console.error("Erreur lors de la suppression du colis:", error);
      } else {
        setParcels(parcels.filter((parcel) => parcel.id !== parcelToDelete));
      }
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

  const getRowClassName = (params: any) => {
    switch (params.row.statut) {
      case 0:
        return "bg-green-100";
      case 1:
        return "bg-yellow-100";
      case 2:
        return "bg-blue-100";
      case 3:
        return "bg-red-100";
      case 4:
        return "bg-red-200";
      default:
        return "";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "poids", headerName: "Poids (kg)", type: "number", width: 120 },
    { field: "prix", headerName: "Prix ($)", type: "number", width: 120 },
    { field: "token", headerName: "Jeton", width: 150 },
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
            : params.value === 2
            ? "Expédié"
            : "Rétiré"}
        </Typography>
      ),
    },
    { field: "client_nom", headerName: "Nom du Client", width: 150 },
    { field: "client_email", headerName: "Email du Client", width: 150 },
    {
      field: "client_telephone",
      headerName: "Téléphone du Client",
      width: 150,
    },
    { field: "expediteur_nom", headerName: "Expéditeur", width: 150 },
    { field: "adresse", headerName: "Adresse", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <>
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
          onClick={handleAddParcel}
        >
          Ajouter Colis
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={parcels}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
          getRowClassName={getRowClassName} // Appliquez la fonction ici
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
      )}

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

      <Dialog open={openViewParcel} onClose={() => setOpenViewParcel(false)}>
        <DialogContent>
          {selectedParcelDetails && (
            <ViewParcel
              parcel={selectedParcelDetails}
              onClose={() => setOpenViewParcel(false)}
              setParcelsChange={setParcelsChanged}
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
