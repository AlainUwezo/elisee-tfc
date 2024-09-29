import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./../components/Sidebar";
import AppBarHeader from "./../components/AppbarHeader";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        paddingTop: "64px",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* AppBar */}
        <AppBarHeader />

        {/* Content */}
        <Box sx={{ padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default PageContainer;
