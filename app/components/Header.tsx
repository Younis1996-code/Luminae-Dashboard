// Import React, the core library for building user interfaces in JavaScript.
import React from "react";

// Import specific components from Material-UI (MUI) for building the app bar.
// AppBar: The top navigation bar component.
// Toolbar: Container for toolbar content.
// Typography: For text styling and variants.
// IconButton: Button that uses icons.
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";

// Import MenuIcon from MUI icons for the hamburger menu button.
import MenuIcon from "@mui/icons-material/Menu";

// Define the TypeScript interface for the component's props.
// toggleDrawer: A function prop to toggle the sidebar/drawer visibility.
interface HeaderProps {
  toggleDrawer: () => void;
}

// The Header component, typed as a functional component (React.FC) with HeaderProps.
// It receives toggleDrawer as a prop to handle sidebar toggling.
const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  return (
    // MUI AppBar component for the fixed top navigation bar.
    // Position set to "fixed" to stick at the top.
    // sx prop for custom styles: Sets z-index higher than the drawer's to ensure it overlays properly.
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      {/* // MUI Toolbar inside the AppBar to hold the content horizontally. */}
      <Toolbar>
        {/* // MUI IconButton for the menu icon. // Color "inherit" to match the
        AppBar's theme. // Edge "start" to align at the beginning. // onClick
        calls the toggleDrawer function. // sx for margin right of 2 units. */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          {/* // The actual MenuIcon (hamburger icon) inside the button. */}
          <MenuIcon />
        </IconButton>
        {/* // MUI Typography for the title text. // Variant "h6" for heading size
        6. // noWrap to prevent text wrapping on small screens. */}
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Export the Header component as default for easy import in other files.
export default Header;
