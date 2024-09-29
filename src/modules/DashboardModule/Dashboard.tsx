import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageContainer from "../common/layouts/PageContainer";

// Enregistrer les échelles et les éléments nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Données statiques pour les retraits
  const withdrawals = [
    {
      id: 1,
      clientName: "Client 1",
      parcelName: "Colis 1",
      date: "2024-09-01",
      status: "Retiré",
    },
    {
      id: 2,
      clientName: "Client 2",
      parcelName: "Colis 2",
      date: "2024-09-02",
      status: "En attente",
    },
    {
      id: 3,
      clientName: "Client 3",
      parcelName: "Colis 3",
      date: "2024-09-03",
      status: "Retiré",
    },
    {
      id: 4,
      clientName: "Client 4",
      parcelName: "Colis 4",
      date: "2024-09-04",
      status: "Expédié",
    },
    {
      id: 5,
      clientName: "Client 5",
      parcelName: "Colis 5",
      date: "2024-09-05",
      status: "En attente",
    },
    {
      id: 6,
      clientName: "Client 6",
      parcelName: "Colis 6",
      date: "2024-09-06",
      status: "Retiré",
    },
    {
      id: 7,
      clientName: "Client 7",
      parcelName: "Colis 7",
      date: "2024-09-07",
      status: "En attente",
    },
    {
      id: 8,
      clientName: "Client 8",
      parcelName: "Colis 8",
      date: "2024-09-08",
      status: "Retiré",
    },
    {
      id: 9,
      clientName: "Client 9",
      parcelName: "Colis 9",
      date: "2024-09-09",
      status: "Expédié",
    },
    {
      id: 10,
      clientName: "Client 10",
      parcelName: "Colis 10",
      date: "2024-09-10",
      status: "Retiré",
    },
  ];

  // Données statiques pour les clients
  const clients = [
    { id: 1, name: "Client 1", email: "client1@example.com" },
    { id: 2, name: "Client 2", email: "client2@example.com" },
    { id: 3, name: "Client 3", email: "client3@example.com" },
    { id: 4, name: "Client 4", email: "client4@example.com" },
    { id: 5, name: "Client 5", email: "client5@example.com" },
  ];

  // Données statiques pour les colis
  const parcels = [
    { id: 1, name: "Colis 1", status: "En stock" },
    { id: 2, name: "Colis 2", status: "En route" },
    { id: 3, name: "Colis 3", status: "Expédié" },
    { id: 4, name: "Colis 4", status: "En stock" },
    { id: 5, name: "Colis 5", status: "En route" },
  ];

  const totalClients = clients.length;
  const totalParcels = parcels.length;
  const totalWithdrawals = withdrawals.length;

  // Comptage des statuts de colis
  const parcelStatusCount = parcels.reduce((acc, parcel) => {
    acc[parcel.status] = (acc[parcel.status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Données pour le graphique de statut des colis
  const parcelData = {
    labels: Object.keys(parcelStatusCount),
    datasets: [
      {
        label: "Statut des Colis",
        data: Object.values(parcelStatusCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  // Données pour le graphique comparatif des retraits et colis expédiés
  const comparisonData = {
    labels: ["Total Retraits", "Total Colis Expédiés"],
    datasets: [
      {
        label: "Comparaison",
        data: [
          totalWithdrawals,
          parcels.filter((parcel) => parcel.status === "Expédié").length,
        ],
        backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <PageContainer>
      <Typography variant="h4" align="center">
        Tableau de Bord
      </Typography>
      <IconButton style={{ float: "right" }} aria-label="refresh">
        <RefreshIcon />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Total Clients" />
            <Divider />
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {totalClients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Total Colis" />
            <Divider />
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {totalParcels}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Total Retraits" />
            <Divider />
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {totalWithdrawals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        marginTop={3}
      >
        <Box flex={1} marginRight={{ sm: 2 }} marginBottom={{ xs: 2, sm: 0 }}>
          <Paper style={{ padding: 16, height: 300 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Comparaison Retraits / Colis Expédiés
            </Typography>
            <Divider />
            <Bar
              data={comparisonData}
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </Paper>
        </Box>
        <Box flex={1} marginLeft={{ sm: 2 }}>
          <Paper style={{ padding: 16, height: 300 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Statut des Colis
            </Typography>
            <Divider />
            <Pie
              data={parcelData}
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </Paper>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom style={{ marginTop: 32 }}>
        Historique des Retraits
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom du Client</TableCell>
              <TableCell>Nom du Colis</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals.map((withdrawal) => (
              <TableRow key={withdrawal.id}>
                <TableCell>{withdrawal.id}</TableCell>
                <TableCell>{withdrawal.clientName}</TableCell>
                <TableCell>{withdrawal.parcelName}</TableCell>
                <TableCell>{withdrawal.date}</TableCell>
                <TableCell>{withdrawal.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default Dashboard;
