import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intruksi from "./pages/Intruksi.jsx";
import Beranda from "./pages/Beranda.jsx";
import Tatatertib from "./pages/TataTertib.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Beranda />,
      },
      {
        path: "/tatatertib",
        element: <Tatatertib />,
      },
      {
        path: "/intruksi",
        element: <Intruksi />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);