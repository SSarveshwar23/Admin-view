import React, { useState, useEffect } from "react";
import { Panel, PanelHeader, PanelBody } from "../../../components/panel/panel";
import "bootstrap/dist/css/bootstrap.min.css";

function FormElements({ selectedUser, isCollapsed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    contactNumber: "",
    email: "",
    designation: "",
    role: "",
    company: "",
    companyOptions: [],
  });
  
  const companies = ["Company A", "Company B", "Company C"];

  useEffect(() => {
    if (selectedUser) {
      setProfile((prev) => ({
        ...prev,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role, // Load role
        company: selectedUser.company, // Load company
      }));
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      const updatedProfile = {
        ...prevProfile,
        [name]: value,
        ...(name === "role"
          ? {
              company: "",
              companyOptions: value === "Client" ? companies : ["Reinfosec"],
            }
          : {}),
      };

      return updatedProfile;
    });
  };

  // Function to save the profile
  const handleSave = () => {
    if (selectedUser) {
      // Get existing approved users from localStorage
      const storedApprovedUsers = JSON.parse(localStorage.getItem("approvedUsers")) || [];
      
      // Update the approved users with the edited profile
      const updatedUsers = storedApprovedUsers.map(user => 
        user.id === selectedUser.id ? { ...user, ...profile } : user
      );
      
      // Save the updated users back to localStorage
      localStorage.setItem("approvedUsers", JSON.stringify(updatedUsers));
    }
    
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div>
      <h1 className="page-header">Form Elements</h1>
      <div className="row mb-3">
        <div className="col-12">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center">
                <span>Form Controls</span>
                <button className="btn btn-primary" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </PanelHeader>
            <PanelBody>
              <form style={{ width: "100%" }}>
                {!isCollapsed && (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="contactNumber"
                          value={profile.contactNumber}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Designation</label>
                        <input
                          type="text"
                          className="form-control"
                          name="designation"
                          value={profile.designation}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Role</label>
                        <select
                          className="form-control"
                          name="role"
                          value={profile.role}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="">Select Role</option>
                          <option value="Client">Client</option>
                          <option value="Resource">Resource</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company</label>
                        <select
                          className="form-control"
                          name="company"
                          value={profile.company}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="">Select Company</option>
                          {profile.companyOptions.map((company, index) => (
                            <option key={index} value={company}>
                              {company}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default FormElements;
