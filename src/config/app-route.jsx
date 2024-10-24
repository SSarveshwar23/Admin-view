import React from "react";
import App from "./../app.jsx";
import {Outlet, Navigate } from "react-router-dom";
import ProjectDetails from "../pages/user-management/Subpages/projectdetails.jsx";

import LoginV3 from '../pages/user/login.jsx';
import RegisterV3 from '../pages/user/register.jsx';
import Home from "./../pages/home/home.js";
import Error from "./../pages/error/error.js";
import TablePlugins from "../pages/user-management/table-plugins";
import ExtraClients from "../pages/client-management/Client";
import ClinetHome from "../pages/user-management/Home.jsx";
import ExtraProfile from '../pages/profile/profile.jsx';
import Calendar from '../pages/calender/calender.jsx';
import EmailInbox from '../pages/email/email-inbox.jsx';
import EmailDetail from '../pages/email/email-detail.jsx';
import EmailCompose from '../pages/email/email-compose.jsx';
import ExtraMessengerPage from "../pages/messenger/messenger.jsx";
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
      { path: "", element: <LoginV3/> },
      { path: "*", element: <Error /> },
      {
				path: 'home/', element: <Home />
			},
      {
				path: 'user/*', 
				element: <Outlet />,
				children: [
					{ path: 'login-v3', element:<LoginV3 /> },
					{ path: 'register-v3', element:<RegisterV3 /> },
					{ path: '*', element: <Error /> }
				]
			},
      { path: "user-management/", element: <TablePlugins /> },
      { path: "client/", element: <ExtraClients /> },
      {
				path: 'settings/', element: <ExtraProfile />
			},
      {
				path: 'calendar/', 
				element: <Calendar />
			},
      {
				path: 'email/*', 
				element: <Outlet />,
				children: [
					{ path: 'inbox/', element: <EmailInbox /> },
					{ path: 'compose', element: <EmailCompose /> },
					{ path: 'detail', element: <EmailDetail /> },
					{ path: '*', element: <Error /> }
				]
			},
      {
         path: 'messenger-page', element:<ExtraMessengerPage /> 
      },
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
