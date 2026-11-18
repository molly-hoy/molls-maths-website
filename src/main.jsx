/* Entry point: React starts here and draws <App /> inside <div id="root">. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css"; // global styles first, so component styles can override them
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
