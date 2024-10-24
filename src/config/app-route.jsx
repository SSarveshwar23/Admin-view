import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";
import ProjectDetails from "../pages/user-management/Subpages/projectdetails.jsx";

import Home from "./../pages/home/home.js";
import Error from "./../pages/error/error.js";
import TablePlugins from "../pages/user-management/table-plugins";
import ExtraClients from "../pages/client-management/Client";
import ClinetHome from "../pages/user-management/Home.jsx";
import {
  Activo,
  Curso,
  Doctio,
  HrCases,
  Liquid,
} from "../pages/user-management/Subpages/projects.jsx";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Error /> },
      { path: "user/", element: <TablePlugins /> },
      { path: "client/", element: <ExtraClients /> },
      {
        path: "secondary",
        element: <ClinetHome />,
        children: [
          {
            path: "software",
            children: [
              { path: ":projectName", element: <ProjectDetails /> },
              { path: "curso", element: <Curso /> },
              { path: "activo", element: <Activo /> },
              { path: "liquid", element: <Liquid /> },
            ],
          },
          {
            path: "business",
            children: [
              { path: "hr-cases", element: <HrCases /> },
              { path: "doctio", element: <Doctio /> },
            ],
          },
        ],
      },
    ],
  },
];

export default AppRoute;
