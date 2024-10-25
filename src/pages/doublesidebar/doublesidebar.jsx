import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Doublesidebar = ({ isCollapsed, onCollapse }) => {
  const [isProjectCollapsed, setIsProjectCollapsed] = useState(false); // State to track project collapse
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const [softwareProjects, setSoftwareProjects] = useState([ // Initial state for software projects
    { name: "Curso", path: "software/curso" },
    { name: "Activo", path: "software/activo" },
    { name: "Liquid", path: "software/liquid" },
  ]);

  // Load selected user from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser)); // Parse and set selected user
    }
  }, []);

  // Function to toggle sidebar collapse state
  const toggleCollapse = () => {
    onCollapse(!isCollapsed); // Toggle the collapse state
  };

  // Function to toggle project collapse state
  const toggleProjectCollapse = () => {
    setIsProjectCollapsed(!isProjectCollapsed); // Toggle the project section
  };

  // Function to handle adding a new project
  const handleAddProject = () => {
    const projectName = prompt("Enter the project name:"); // Prompt for project name
    const projectType = prompt("Enter project type ('software' or 'business'):"); // Prompt for project type

    // Check project type and update the state accordingly
    if (projectType === "software") {
      setSoftwareProjects([
        ...softwareProjects,
        { name: projectName, path: `/software/${projectName.toLowerCase()}` },
      ]);
    } else {
      alert("Invalid project type. Please enter either 'software' or 'business'."); // Alert for invalid input
    }
  };

  // Function to render the project section
  const renderProjectSection = (title, projects) => (
    <div>
      <h6
        className={`text-white ${isCollapsed ? "d-none" : ""}`} // Hide title when collapsed
        style={{
          marginTop: "20px",
          fontSize: "1rem",
          fontWeight: "500", // Medium font weight
        }}
      >
        {title}
      </h6>
      <ul className="list-unstyled">
        {projects.map((project, index) => (
          <li
            key={index}
            className={`my-2 ${title === "Software" ? "border rounded" : ""}`} // Add border for software projects
            style={{
              border: "1px solid #00BFFF", // Border color
              padding: "10px",
              backgroundColor: "rgba(0, 191, 255, 0.1)", // Light background color
              transition: "background-color 0.3s", // Smooth background transition
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 191, 255, 0.3)"; // Darker background on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 191, 255, 0.1)"; // Reset background on mouse leave
            }}
          >
            <Link
              to={project.path} // Link to the project path
              className="text-white d-flex justify-content-between align-items-center text-decoration-none"
            >
              <span>{project.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="secondsidebar" style={{ marginLeft: "-37px", top: "75px" }}>
      <div
        className={`second-sidenav bg-dark p-3 d-flex flex-column ${
          isCollapsed ? "collapsed" : ""
        }`}
        style={{
          height: "100vh",
          width: isCollapsed ? "60px" : "250px", // Set width based on collapse state
          transition: "width 0.3s", // Smooth transition for width change
          position: "fixed",
          top: "75px",
        }}
      >
        {/* Top Section with User Info */}
        <div
          className="d-flex align-items-center mb-4"
          style={{
            marginRight: "10px",
            marginTop: "20px",
            opacity: isCollapsed ? 0 : 1, // Hide the top section when collapsed
            transition: "opacity 0.3s", // Smooth transition for opacity change
          }}
        >
          <div className="ms-2" style={{ paddingLeft: "10px", flex: 1 }}>
            {selectedUser ? ( // Render user info if available
              <>
                <h6 className="text-white mb-0" style={{ fontSize: "1rem", fontWeight: "500" }}>
                  {selectedUser.name || "Unknown User"}
                </h6>
                <small className="text-white" style={{ fontSize: "0.85rem" }}>
                  {selectedUser.email || "No Email"}
                </small>
              </>
            ) : ( // Default user info if no user is selected
              <>
                <h6 className="text-white mb-0" style={{ fontSize: "1rem", fontWeight: "500" }}>
                  Unknown User
                </h6>
                <small className="text-white" style={{ fontSize: "0.85rem" }}>
                  No Email
                </small>
              </>
            )}
          </div>
        </div>

        {/* Projects Toggle Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div onClick={toggleProjectCollapse} style={{ cursor: "pointer" }}>
            <h4 className="text-white">{!isCollapsed ? "Projects" : ""}</h4>
          </div>
        </div>

        {/* Project List Section */}
        {!isProjectCollapsed && !isCollapsed && (
          <div>{renderProjectSection("Software", softwareProjects)}</div>
        )}

        {/* Collapse Button */}
        <div
          className="cursor-pointer btn btn-dark btn-sm"
          onClick={toggleCollapse}
          style={{
            marginLeft:"-45px",
            position: "absolute",
            top: "500px",
            left: isCollapsed ? "60px" : "240px", // Position collapse button based on collapse state
            transition: "left 0.3s", // Smooth transition for button position
            zIndex: 1,
          }}
        >
          {isCollapsed ? ( // Render different icons based on collapse state
            <ArrowForwardIosRoundedIcon />
          ) : (
            <ArrowBackIosNewRoundedIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doublesidebar;
