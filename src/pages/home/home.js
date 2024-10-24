import React from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
import TablePlugins from "../user-management/table-plugins";
import ExtraClients from "../client-management/Client";
import PageWithSearchSidebar from "../doublesidebar/doublesidebar.jsx";

function Home() {
  return (
    <div>
     
<h1>Dashboard</h1>
      {/* <h1 className="page-header"><TablePlugins/></h1>
      <h1 className="page-header"><ExtraClients/></h1> */}
    </div>
  );
}

export default Home;
