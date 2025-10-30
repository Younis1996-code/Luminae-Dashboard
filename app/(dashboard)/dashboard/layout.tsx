'use client';

import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import MainContent from "@/app/components/MainContent";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={open} drawerWidth={drawerWidth} />
      <MainContent open={open} drawerWidth={drawerWidth}>
        {children}
      </MainContent>
    </Box>
  );
}