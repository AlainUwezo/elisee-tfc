// ParcelsList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Parcel {
  id: number;
  name: string;
  status: string;
}

interface ParcelsListProps {
  parcels: Parcel[];
}

const ParcelsList: React.FC<ParcelsListProps> = ({ parcels }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: 32 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom du Colis</TableCell>
            <TableCell>Statut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parcels.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell>{parcel.id}</TableCell>
              <TableCell>{parcel.name}</TableCell>
              <TableCell>{parcel.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParcelsList;
