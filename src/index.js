import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { Stack } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Router>
        <Stack className="items-center">
          <Routes>
            <Route path="/" element={<Login replace to="/user/login" />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/create" element={<CreateUser />} />
          </Routes>
        </Stack>
        <Routes>
          <Route path="/api/events" element={<App />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
);
