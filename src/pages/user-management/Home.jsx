import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Doublesidebar from '../doublesidebar/doublesidebar';

function ClinetHome() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the state from the location object
  const { user } = location.state || {}; // Access the passed user details

  const handleSidebarToggle = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };

  return (
    <div className='d-flex'>
      <Doublesidebar isCollapsed={isCollapsed} onCollapse={handleSidebarToggle} selectedUser={user}/>
      <div className={`content-area p-4 ${isCollapsed ? 'col-lg-12' : 'col-lg-10'}`} style={{ transition: 'width 0.3s', marginLeft: isCollapsed ? '45px' : '250px', width:'100%' }}>
      <Outlet />
      </div>
    </div>
  )
}

export default ClinetHome;