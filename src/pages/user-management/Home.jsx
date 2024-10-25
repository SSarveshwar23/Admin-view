import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Doublesidebar from '../doublesidebar/doublesidebar';
import MainContent from './Subpages/MainContent';

function ClinetHome() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the state from the location object
  const { user } = location.state || {}; // Access the passed user details
  const shouldShowMainContent = location.pathname === '/secondary';

  const handleSidebarToggle = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className='d-flex'>
      <Doublesidebar isCollapsed={isCollapsed} onCollapse={handleSidebarToggle} selectedUser={user}/>
      <div className={`content-area p-4 ${isCollapsed ? 'col-lg-12' : 'col-lg-10'}`} style={{ transition: 'width 0.3s', marginLeft: isCollapsed ? '45px' : '250px', width:'100%' }}>
      {shouldShowMainContent && <MainContent selectedUser={selectedUser} />
    }
      <Outlet />
      </div>
    </div>
  )
}

export default ClinetHome;