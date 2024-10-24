import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Doublesidebar = ({ isCollapsed, onCollapse }) => {
  const [isProjectCollapsed, setIsProjectCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [softwareProjects, setSoftwareProjects] = useState([
    { name: 'Curso', path: 'software/curso' },
    { name: 'Activo', path: 'software/activo' },
    { name: 'Liquid', path: 'software/liquid' },
  ]);
  const [businessProjects, setBusinessProjects] = useState([
    { name: 'HRCases', path: '/business/hrcases' },
    { name: 'Doctio', path: '/business/doctio' },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser)); // Parse and set the user data
    }
  }, []);

  const toggleCollapse = () => {
    onCollapse(!isCollapsed);
  };

  const toggleProjectCollapse = () => {
    setIsProjectCollapsed(!isProjectCollapsed);
  };

  const handleAddProject = () => {
    const projectName = prompt('Enter the project name:');
    const projectType = prompt("Enter project type ('software' or 'business'):");

    if (projectType === 'software') {
      setSoftwareProjects([
        ...softwareProjects,
        { name: projectName, path: `/software/${projectName.toLowerCase()}` },
      ]);
    } else if (projectType === 'business') {
      setBusinessProjects([
        ...businessProjects,
        { name: projectName, path: `/business/${projectName.toLowerCase()}` },
      ]);
    } else {
      alert("Invalid project type. Please enter either 'software' or 'business'.");
    }
  };

  const renderProjectSection = (title, projects) => (
    <div>
      <h6 className={`text-white ${isCollapsed ? 'd-none' : ''}`} style={{ marginTop: '20px' }}>
        {title}
      </h6>
      <ul className="list-unstyled">
        {projects.map((project, index) => (
          <li key={index} className="my-2">
            <Link to={project.path} className="text-white d-flex justify-content-between align-items-center">
              <span>{project.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="secondsidebar" style={{ marginLeft: '-37px', top: '75px' }}>
      <div
        className={`second-sidenav bg-dark p-3 d-flex flex-column ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          height: '100vh',
          width: isCollapsed ? '60px' : '250px',
          transition: 'width 0.3s',
          position: 'fixed',
          top: '75px',
        }}
      >
        {/* Client Info - Always visible */}
        <div className="d-flex align-items-center mb-4">
          <AccountCircleIcon style={{ color: 'white', fontSize: '40px' }} />
          {!isCollapsed && (
            <div className="ms-2">
              {selectedUser ? (
                <>
                  <h6 className="text-white mb-0">{selectedUser.name || 'Unknown User'}</h6>
                  <small className="text-white">{selectedUser.email || 'No Email'}</small>
                </>
              ) : (
                <>
                  <h6 className="text-white mb-0">Unknown User</h6>
                  <small className="text-white">No Email</small>
                </>
              )}
            </div>
          )}
        </div>

        {/* Project Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div onClick={toggleProjectCollapse} style={{ cursor: 'pointer' }}>
            <h4 className="text-white">{!isCollapsed ? 'Projects' : ''}</h4>
          </div>
          {!isCollapsed && (
            <div
              className="text-white fw-bold d-flex align-items-center btn btn-block btn-primary"
              onClick={handleAddProject}
              style={{ cursor: 'pointer' }}
            >
              +
            </div>
          )}
        </div>

        {/* Collapsible Project Sections */}
        {!isProjectCollapsed && !isCollapsed && (
          <div>
            {renderProjectSection('Software', softwareProjects)}
            {renderProjectSection('Business', businessProjects)}
          </div>
        )}

        {/* Collapse Button */}
        <div
          className="cursor-pointer btn btn-dark btn-sm"
          onClick={toggleCollapse}
          style={{
            position: 'absolute',
            top: '500px',
            left: isCollapsed ? '60px' : '240px',
            transition: 'left 0.3s',
            zIndex: 1,
          }}
        >
          {isCollapsed ? <ArrowForwardIosRoundedIcon /> : <ArrowBackIosNewRoundedIcon />}
        </div>
      </div>
    </div>
  );
};

export default Doublesidebar;
