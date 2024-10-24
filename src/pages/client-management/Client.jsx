import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddClientForm from "./AddClientForm";
import ClientDetail from "./ClientDetail"; // Import the detail modal
import "./status.css";

function ExtraClients() {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // State for selected client
  const [showDetail, setShowDetail] = useState(false); // State to control detail modal

  // Load clients from localStorage when the component mounts
  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "In Progress":
        return "badge bg-warning";
      case "Complete":
        return "badge bg-success";
      case "Pending":
        return "badge bg-secondary";
      default:
        return "badge bg-light text-dark";
    }
  };

  const filteredClients =
    filter === "All"
      ? clients
      : clients.filter((client) => client.Status === filter);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (newClientData) => {
    const newClient = {
      id: `client${clients.length + 1}`, // Create a new client ID
      company_name: newClientData.companyName,
      location: newClientData.registeredAddress,
      Status: "In Progress", // Set the default status or modify as needed
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients)); // Save to localStorage
    handleClose(); // Close the modal after adding the client
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowDetail(true); // Show detail modal
  };

  const handleCloseDetail = () => {
    setSelectedClient(null);
    setShowDetail(false);
  };

  return (
    <div className="client fs-6">
      <div className="d-flex align-items-center mb-3">
        <div>
          <h1 className="page-header mb-0">Clients</h1>
        </div>
        <div className="ms-auto">
          <Link
            to="#"
            onClick={handleShow}
            className="btn btn-success btn-rounded px-4 rounded-pill"
          >
            <i className="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Add
            Client
          </Link>
        </div>
      </div>

      {show && (
        <div className={`modal fade show`} style={{ display: "block" }}>
          <AddClientForm
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </div>
      )}
      {show && <div className="modal-backdrop fade show"></div>}

      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Client List</h5>
          <div className="filter-buttons">
            <button
              className={`btn btn-outline-${
                filter === "All" ? "primary" : "secondary"
              } me-2`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-outline-${
                filter === "In Progress" ? "primary" : "secondary"
              } me-2`}
              onClick={() => setFilter("In Progress")}
            >
              In Progress
            </button>
            <button
              className={`btn btn-outline-${
                filter === "Complete" ? "primary" : "secondary"
              } me-2`}
              onClick={() => setFilter("Complete")}
            >
              Complete
            </button>
            <button
              className={`btn btn-outline-${
                filter === "Pending" ? "primary" : "secondary"
              }`}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} onClick={() => handleClientClick(client)}>
                  <td>{client.id}</td>
                  <td>{client.company_name}</td>
                  <td>{client.location}</td>
                  <td>
                    <span className={getStatusStyle(client.Status)}>
                      {client.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetail && selectedClient && (
        <ClientDetail client={selectedClient} handleClose={handleCloseDetail} />
      )}
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default ExtraClients;
