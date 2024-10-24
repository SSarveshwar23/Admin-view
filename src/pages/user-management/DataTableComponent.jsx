import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function DataTableComponent({ filteredData }) {
  const [data, setData] = useState(filteredData); // Initial state of data

  useEffect(() => {
    setData(filteredData); // Update local data whenever filteredData changes
  }, [filteredData]);

  const columns = [
    {
      name: "Name",
      selector: (row) => (row.isEditing ? (
        <input
          type="text"
          value={row.name}
          onChange={(e) => handleChange(row.id, "name", e.target.value)}
        />
      ) : (
        row.name
      )),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (row.isEditing ? (
        <input
          type="email"
          value={row.email}
          onChange={(e) => handleChange(row.id, "email", e.target.value)}
        />
      ) : (
        row.email
      )),
      sortable: true,
    },
  
    {
      name: "Role",
      selector: (row) => (row.isEditing ? (
        <input
          type="text"
          value={row.role}
          onChange={(e) => handleChange(row.id, "role", e.target.value)}
        />
      ) : (
        row.role
      )),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {row.isEditing ? (
            <button
              onClick={() => handleSave(row.id)}
              className="btn btn-success btn-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleEdit(row.id)}
              className="btn btn-warning btn-sm"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger btn-sm ms-2"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, isEditing: true } : user
    );
    setData(updatedData);
  };

  const handleChange = (id, field, value) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setData(updatedData);
  };

  const handleSave = (id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, isEditing: false } : user
    );
    setData(updatedData);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
      noDataComponent="No users available."
    />
  );
}

export default DataTableComponent;
