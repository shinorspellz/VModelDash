"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const MUIProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIProvider;
