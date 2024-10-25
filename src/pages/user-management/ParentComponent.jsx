import React, { useState, useEffect } from "react";
import FormElements from "./FormElements"; // Adjust the path as necessary
import TablePlugins from "./TablePlugins"; // Adjust the path as necessary

const ParentComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setSelectedUser(updatedUser);
    localStorage.setItem("selectedUser", JSON.stringify(updatedUser));
  };

  return (
    <div>
      <FormElements selectedUser={selectedUser} onUserUpdate={handleUserUpdate} />
      <TablePlugins selectedUser={selectedUser} />
    </div>
  );
};

export default ParentComponent;
