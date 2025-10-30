"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory"; // Icon for Products
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ open, drawerWidth }) => {
  const pathname = usePathname();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            href="/dashboard"
            selected={pathname === "/dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            href="/dashboard/products"
            selected={pathname === "/dashboard/products"}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            href="/dashboard/settings"
            selected={pathname === "/dashboard/settings"}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
