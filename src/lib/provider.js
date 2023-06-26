"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
