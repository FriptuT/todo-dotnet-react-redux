/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import "./App.css";
import Typography from "@mui/material/Typography";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import { useState } from "react";
import React from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

        <Container>
          <TextInput />

        </Container>

        
      </ThemeProvider>
    </>
  );
}

export default App;
