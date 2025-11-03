"use client";
import React from "react";

// Import various Material-UI (MUI) components for the sidebar structure.
// Drawer: The sidebar container.
// List: For listing menu items.
// ListItemIcon: To add icons to list items.
// Divider: Horizontal line separator.
// ListItemText: For text in list items.
// Toolbar: Spacer for the app bar height.
// Box: Flexible container for layout.
import {
  Drawer,
  List,
  ListItemIcon,
  Divider,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";

// Import ListItemButton from MUI for clickable list items.
// This is used instead of ListItem for better button behavior.
import ListItemButton from "@mui/material/ListItemButton";

// Import icons from MUI for menu items.
// DashboardIcon: For home.
// SettingsIcon: For settings.
// InventoryIcon: For products.
// LogoutIcon: For sign out.
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

// Import Link from Next.js for client-side navigation.
// This wraps buttons to enable routing without full page reloads.
import Link from "next/link";

// Import usePathname from Next.js navigation.
// This hook gets the current URL path to highlight the active menu item.
import { usePathname } from "next/navigation";

// Import signOut from next-auth/react for logging out.
// This function ends the user session and can redirect.
import { signOut } from "next-auth/react";

// Define the TypeScript interface for the component's props.
// open: Boolean to control if the drawer is visible.
// drawerWidth: Number for the width of the drawer.
interface SidebarProps {
  open: boolean;
  drawerWidth: number;
}

// The Sidebar component, typed as a functional component (React.FC) with SidebarProps.
// It receives open and drawerWidth as props to control visibility and size.
const Sidebar: React.FC<SidebarProps> = ({ open, drawerWidth }) => {
  // Use usePathname hook to get the current route.
  // This is used to apply 'selected' state to the active menu item.
  const pathname = usePathname();

  return (
    // MUI Drawer component for the sidebar.
    // Variant "persistent" means it stays open/closed based on state.
    // Open prop controls visibility.
    // sx for styles: Sets width, prevents shrinking, and styles the paper element.
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {/* // MUI Toolbar as a spacer to align content below the app bar. */}
      <Toolbar />
      {/*MUI Box for flexible layout inside the drawer. // Styles: Auto
      overflow, column flex direction, full height. */}
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* // MUI List for the main menu items. */}
        <List>
          {/* // ListItemButton for "Home" link. // component={Link} integrates with
          Next.js for navigation. // href sets the route. // selected highlights
          if current path matches. */}
          <ListItemButton
            component={Link}
            href="/dashboard"
            selected={pathname === "/dashboard"}
          >
            {/* // Icon for the item. */}
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {/* // Text for the item. */}
            <ListItemText primary="Home" />
          </ListItemButton>
          {/* // ListItemButton for "Products" link. // Similar structure: Link
          integration, route, selection based on path. */}
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
          {/* // ListItemButton for "Settings" link. // Similar to above. */}
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
        {/* // Box with flexGrow:1 to push the following content to the bottom. //
        This creates space and aligns sign-out at the end. */}
        <Box sx={{ flexGrow: 1 }} /> {/* Pushes sign-out to bottom */}
        {/* // MUI Divider for a horizontal line separating main menu from sign-out. */}
        <Divider />
        {/* // Another List for the sign-out item at the bottom. */}
        <List>
          {/* // ListItemButton for "Sign Out". // onClick calls signOut with
          redirect to "/signin". // No Link here, as it's an action, not
          navigation. */}
          <ListItemButton
            onClick={() => signOut({ callbackUrl: "/signin" })} // <-- ends the session and redirects
          >
            {/* // Icon for sign-out. */}
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {/* // Text for sign-out. */}
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

// Export the Sidebar component as default for easy import in other files.
export default Sidebar;
