import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./useInput";

const App = () => {
  const titleUpdater = useTitle("Loading... ");
  setTimeout(() => titleUpdater("Home", 5000));
  return (
    <div className="App">
      <div>HI</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
