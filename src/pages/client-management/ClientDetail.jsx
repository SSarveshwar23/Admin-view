import React from "react";
import "./status.css";

function ClientDetail({ client, handleClose }) {
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Client Details</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="client-detail">
                <p>
                  <strong>Client ID:</strong> {client.id}
                </p>
                <p>
                  <strong>Company Name:</strong> {client.company_name}
                </p>
                <p>
                  <strong>Location:</strong> {client.location}
                </p>
                <p>
                  <strong>Status:</strong> {client.Status}
                </p>
                {/* Add more fields as needed */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientDetail;
