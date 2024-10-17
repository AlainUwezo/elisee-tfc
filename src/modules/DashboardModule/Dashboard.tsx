/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  Divider,
  IconButton,
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
import { supabase } from "../../lib/helpers/superbaseClient";

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
  const [parcels, setParcels] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [averageWithdrawalTime, setAverageWithdrawalTime] = useState<number>(0);

  // Charger les données de Supabase pour les colis
  const fetchParcels = async () => {
    const { data, error } = await supabase.from("colis").select("*");
    if (!error) setParcels(data);
  };

  // Charger les données de Supabase pour les retraits
  const fetchWithdrawals = async () => {
    const { data, error } = await supabase.from("withdrawals").select("*");
    if (!error) setWithdrawals(data);
  };

  // Calculer le temps moyen de retrait en heures
  const calculateAverageWithdrawalTime = () => {
    if (withdrawals.length > 0) {
      const totalTime = withdrawals.reduce((acc, withdrawal) => {
        const createdAt = new Date(withdrawal.created_at).getTime();
        const now = new Date().getTime();
        const timeDifference = (now - createdAt) / 1000 / 60 / 60; // Différence en heures
        return acc + timeDifference;
      }, 0);
      setAverageWithdrawalTime(totalTime / withdrawals.length); // Moyenne en heures
    }
  };

  useEffect(() => {
    fetchParcels();
    fetchWithdrawals();
  }, []);

  useEffect(() => {
    calculateAverageWithdrawalTime();
  }, [parcels]);

  const totalClients = 5; // Mettre à jour avec les données réelles des clients si nécessaire
  const totalParcels = parcels.length;
  const totalWithdrawals = parcels.filter(
    (parcel) => parcel.statut === 3
  ).length; // Retirer = statut 3
  const totalExpeditions = parcels.filter(
    (parcel) => parcel.statut === 2
  ).length; // Expédié = statut 2

  // Comptage des statuts de colis
  const parcelStatusCount = parcels.reduce((acc, parcel) => {
    acc[parcel.statut] = (acc[parcel.statut] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Mapping des statuts avec leurs labels
  const statusLabels = {
    0: "En stock",
    1: "En route",
    2: "Expédié",
    3: "Retiré",
  };

  // Données pour le graphique de statut des colis avec les libellés
  const parcelData = {
    labels: Object.keys(parcelStatusCount).map(
      (statut) => statusLabels[statut]
    ),
    datasets: [
      {
        label: "Statut des Colis",
        data: Object.values(parcelStatusCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
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
        data: [totalWithdrawals, totalExpeditions],
        backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <PageContainer>
      <div className="flex justify-between mb-4">
        <Typography variant="h6" className="font-bold">
          Tableau de Bord
        </Typography>
        <IconButton
          style={{ float: "right" }}
          aria-label="refresh"
          onClick={() => {
            fetchParcels();
            fetchWithdrawals();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <div>
            <p className="mb-3">Temps moyen de retrait (minutes)</p>
            <Divider />
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {averageWithdrawalTime.toFixed(2)} h
              </Typography>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="border-r border-l">
            <p className="mb-4 text-center">
              Nombre <strong>colis</strong>
            </p>
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {totalParcels}
              </Typography>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div>
            <p className="mb-3 text-end">Nombre des retraits</p>
            <Divider />
            <CardContent>
              <Typography variant="h3" align="center" color="primary">
                {totalWithdrawals}
              </Typography>
            </CardContent>
          </div>
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        marginTop={3}
      >
        <Box
          flex={1}
          sx={{ marginTop: 6 }}
          marginRight={{ sm: 2 }}
          marginBottom={{ xs: 2, sm: 0 }}
        >
          <div className="h-[300px] flex flex-col items-center">
            <Typography
              variant="subtitle2"
              align="center"
              className="font-[500]"
              gutterBottom
            >
              Nombre des colis par statut
            </Typography>
            <Pie
              data={parcelData}
              options={{
                plugins: {
                  legend: {
                    position: "left",
                    align: "center",
                    labels: {
                      boxWidth: 12,
                      padding: 20,
                    },
                  },
                },
              }}
              className=""
            />
          </div>
        </Box>
        <Box flex={1}>
          <div
            style={{ padding: 16, height: 300 }}
            className="border-t border-l mt-[32px]"
          >
            <Typography variant="h6" align="center" gutterBottom>
              Comparaison Retraits vs Colis Expédiés
            </Typography>
            <Bar data={comparisonData} />
          </div>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
