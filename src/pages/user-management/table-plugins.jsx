import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel"; // Adjust the import path as necessary
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import confirmation dialog
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css for react-confirm-alert
const allData = [
  {
    id: 1,
    name: "Anne Nader",
    email: "Rahul.Dare@hotmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 2,
    name: "Amber Leffler",
    email: "Mia58@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 3,
    name: "Andres Bosco",
    email: "Amir.Anderson@hotmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 4,
    name: "Beverley Kuhlman",
    email: "Beverley_Kuhlman@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 5,
    name: "Cortez Dooley",
    email: "Cortez_Dooley@yahoo.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 6,
    name: "Darryl Stiedemann",
    email: "Darryl_Stiedemann@outlook.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 7,
    name: "Elisa Kuhn",
    email: "Elisa.Kuhn@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 8,
    name: "Francis Koss",
    email: "Francis.Koss@yahoo.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 9,
    name: "George Witting",
    email: "George_Witting@hotmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 10,
    name: "Hilda Runolfsson",
    email: "Hilda.Runolfsson@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 11,
    name: "Irene Schmeler",
    email: "Irene_Schmeler@yahoo.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 12,
    name: "Jonah Schmitt",
    email: "Jonah.Schmitt@hotmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 13,
    name: "Kara Littel",
    email: "Kara_Littel@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 14,
    name: "Leo Altenwerth",
    email: "Leo_Altenwerth@outlook.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 15,
    name: "Mabel Lang",
    email: "Mabel.Lang@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 16,
    name: "Nina Bailey",
    email: "Nina_Bailey@hotmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 17,
    name: "Omar Ferry",
    email: "Omar_Ferry@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 18,
    name: "Paulina Rice",
    email: "Paulina_Rice@yahoo.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 19,
    name: "Quincy Simonis",
    email: "Quincy_Simonis@gmail.com",
    role: "NA",
    company: "NA",
  },
  {
    id: 20,
    name: "Rashad Davis",
    email: "Rashad_Davis@outlook.com",
    role: "NA",
    company: "NA",
  },
];

function TablePlugins() {
  const [newUsers, setNewUsers] = useState(allData);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [filter, setFilter] = useState("new");
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user
  const navigate = useNavigate(); // Initialize navigate

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
    setNewUsers((prev) => prev.filter((u) => u.id !== user.id));
    setApprovedUsers((prev) => [...prev, { ...user, approved: true }]);
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
          onClick: () => { },
        },
      ],
    });
  };

  // Delete a user
  const handleDelete = (user) => {
    setNewUsers((prev) => prev.filter((u) => u.id !== user.id));
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
