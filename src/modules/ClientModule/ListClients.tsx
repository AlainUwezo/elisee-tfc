import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ClientForm from "./ClientForm"; // Assurez-vous que le chemin est correct

interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    adresse: "10 Rue de Paris",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@example.com",
    adresse: "15 Avenue des Champs",
  },
];

const ListeClients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [openForm, setOpenForm] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "prenom", headerName: "Prénom", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "adresse", headerName: "Adresse", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200, // Augmenter la largeur de la colonne d'action
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteConfirmation(params.row.id)}
            style={{ marginLeft: "10px" }} // Ajout d'un espace entre les boutons
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  const handleDeleteConfirmation = (id: number) => {
    setClientToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (clientToDelete !== null) {
      console.log(`Supprimer le client avec l'ID: ${clientToDelete}`);
      setClients(clients.filter((client) => client.id !== clientToDelete));
      setClientToDelete(null);
    }
    setOpenDeleteDialog(false);
  };

  const handleEdit = (client: Client) => {
    setCurrentClient(client);
    setOpenForm(true);
  };

  const handleSave = (client: {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
  }) => {
    if (client.id) {
      // Modifier un client existant
      setClients(
        clients.map((c) => (c.id === client.id ? { ...c, ...client } : c))
      );
    } else {
      // Ajouter un nouveau client
      const newClient = { id: clients.length + 1, ...client };
      setClients([...clients, newClient]);
    }
    setCurrentClient(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des clients
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Nombre de clients: {clients.length}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenForm(true)}
      >
        Ajouter un Client
      </Button>
      <div className="grid grid-cols-1">
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          initialState={{
            pagination: { page: 0 },
          }}
          disableSelectionOnClick
        />
      </div>

      {/* Dialog de confirmation pour la suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmation de Suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce client ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour le formulaire de client */}
      <ClientForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setCurrentClient(null);
        }}
        client={currentClient || undefined}
        onSave={handleSave}
      />
    </Box>
  );
};

export default ListeClients;
