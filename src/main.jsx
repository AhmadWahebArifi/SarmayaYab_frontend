import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoaderProvider } from "./contexts/LoaderProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </StrictMode>,
);
