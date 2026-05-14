import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GovernanceProvider } from "./context/GovernanceContext";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GovernanceProvider>
      <App />
    </GovernanceProvider>
  </React.StrictMode>,
);
