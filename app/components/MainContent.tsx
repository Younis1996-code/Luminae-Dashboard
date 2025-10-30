import React from "react";
import { Box, Toolbar } from "@mui/material";

interface MainContentProps {
  children: React.ReactNode;
  open: boolean;
  drawerWidth: number;
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  open,
  drawerWidth,
}) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: open ? `${drawerWidth}px` : 0,
        transition: "margin 0.3s",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};

export default MainContent;
