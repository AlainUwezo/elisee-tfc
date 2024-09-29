// WithdrawalsList.tsx
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

interface Withdrawal {
  id: number;
  clientName: string;
  parcelName: string;
  date: string;
  status: string;
}

interface WithdrawalsListProps {
  withdrawals: Withdrawal[];
}

const WithdrawalsList: React.FC<WithdrawalsListProps> = ({ withdrawals }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: 32 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom du Client</TableCell>
            <TableCell>Nom du Colis</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
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
  );
};

export default WithdrawalsList;
