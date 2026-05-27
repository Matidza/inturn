import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React from "react";
// import { createRoot } from "react-dom/client";

// import "../index.css"; // 👈 global CSS import
// import App from "./App";

// const container = document.getElementById("root") as HTMLElement;
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );