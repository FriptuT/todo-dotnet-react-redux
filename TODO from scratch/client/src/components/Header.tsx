/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Header({darkMode, handleThemeChange}) {
  return (
    <>
      <AppBar position="static" sx={{mb: 7}}>
        <Toolbar>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Daily tasks
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>
    </>
  );
}
