import React, { useState, useEffect } from "react"; // Import useEffect to manage side effects
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel"; // Adjust the import path as necessary
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import confirmation dialog
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css for react-confirm-alert

const allData = [ /* Initial data */ ]; // Initial user data

function TablePlugins() {
  const [newUsers, setNewUsers] = useState([]); // State for new users
  const [approvedUsers, setApprovedUsers] = useState([]); // State for approved users
  const [filter, setFilter] = useState("new"); // State for filter selection
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user
  const navigate = useNavigate(); // Initialize navigate

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedNewUsers = localStorage.getItem("newUsers");
    const storedApprovedUsers = localStorage.getItem("approvedUsers");

    if (storedNewUsers) {
      setNewUsers(JSON.parse(storedNewUsers)); // Parse and set new users
    } else {
      setNewUsers(allData); // Set initial data if no data in localStorage
    }

    if (storedApprovedUsers) {
      setApprovedUsers(JSON.parse(storedApprovedUsers)); // Parse and set approved users
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("newUsers", JSON.stringify(newUsers)); // Save new users to localStorage
    localStorage.setItem("approvedUsers", JSON.stringify(approvedUsers)); // Save approved users to localStorage
  }, [newUsers, approvedUsers]);

  const notifyApprove = (name) => toast.success(`${name} has been approved!`);
  const notifyDelete = (name) => toast.error(`${name} has been deleted!`);

  // Columns for the DataTable
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true }, // New Role column
    { name: "Company", selector: (row) => row.company, sortable: true }, // New Company column
    {
      name: "Action",
      cell: (row) => (
        <>
          {filter === "new" ? (
            <>
              <button
                onClick={() => handleApprove(row)}
                className="btn btn-primary me-2"
              >
                Approve
              </button>
              <button
                onClick={() => confirmDelete(row)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </>
          ) : (
            <button onClick={() => handleView(row)} className="btn btn-info">
              View
            </button>
          )}
        </>
      ),
    },
  ];

  // Approve a user
  const handleApprove = (user) => {
    setNewUsers((prev) => prev.filter((u) => u.id !== user.id)); // Remove user from new users
    setApprovedUsers((prev) => [...prev, { ...user, approved: true }]); // Add user to approved users
    notifyApprove(user.name);
  };

  // Show confirmation before deleting
  const confirmDelete = (user) => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${user.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(user),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // Delete a user
  const handleDelete = (user) => {
    setNewUsers((prev) => prev.filter((u) => u.id !== user.id)); // Remove user from new users
    notifyDelete(user.name);
  };

  const handleView = (user) => {
    // Navigate to the sidebar page and pass the selected user's details via state
    navigate('/secondary', { state: { user } });
    localStorage.setItem('selectedUser', JSON.stringify(user));
  };

  // Filter data based on the selected filter
  const filteredData = filter === "new" ? newUsers : approvedUsers;

  // Function to render user details
  const renderUserDetails = () => {
    if (!selectedUser) return null; // Return null if no user is selected

    return (
      <div className="user-details">
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {selectedUser.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedUser.email}
        </p>
        <p>
          <strong>Role:</strong> {selectedUser.role}
        </p>
        <p>
          <strong>Company:</strong> {selectedUser.company}
        </p>
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-secondary"
        >
          Back to Users
        </button>
      </div>
    );
  };

  return (
    <div>
      <ol className="breadcrumb fs-6 float-xl-end">
        <li className="breadcrumb-item fs-6">Home</li>
        <li className="breadcrumb-item">Tables</li>
        <li className="breadcrumb-item active">Data Tables</li>
      </ol>

      {/* Conditionally render the filter buttons based on user selection */}
      {!selectedUser && (
        <div className="mb-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => setFilter("new")}
          >
            New Users
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setFilter("approved")}
          >
            Approved Users
          </button>
        </div>
      )}

      {selectedUser ? ( // Conditionally render user details
        renderUserDetails()
      ) : (
        <Panel>
          <PanelHeader>React Table with Toastify and Confirmation</PanelHeader>
          <PanelBody>
            <DataTable
              title="React DataTable Component"
              columns={columns}
              data={filteredData} // Use filtered data
              pagination
            />
          </PanelBody>
        </Panel>
      )}

      <ToastContainer />
    </div>
  );
}

export default TablePlugins;
