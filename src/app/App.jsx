import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { Router } from "./Router";
import { AuthProvider } from "../providers/AuthProvider";
import { HeaderContext } from "../context/HeaderContext";
import { useState } from "react";

export const App = () => {
  const [title, setTitle] = useState("Загрузка...");

  return (
    <AuthProvider>
      <HeaderContext.Provider value={{ title, setTitle }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </HeaderContext.Provider>
    </AuthProvider>
  );
};
