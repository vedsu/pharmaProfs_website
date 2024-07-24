import { PrimeReactProvider } from "primereact/api";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { primeReactConfigOptions } from "./constant.ts";
import "./custom.css";
import "./index.css";
import ppWebsiteRoutes from "./routes.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const routerConfig = createBrowserRouter(ppWebsiteRoutes);

root.render(
  <React.StrictMode>
    <PrimeReactProvider value={primeReactConfigOptions}>
      <RouterProvider router={routerConfig} />
    </PrimeReactProvider>
  </React.StrictMode>
);
