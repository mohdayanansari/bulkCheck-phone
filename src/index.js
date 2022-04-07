import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Tailwind CSS
import "./styles/tailwind.css";
// css
import "./styles/globals.css";
import "./styles/phoneInput.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
