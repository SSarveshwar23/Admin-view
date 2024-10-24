import React from 'react';
import { useParams } from 'react-router-dom';

const allData = [
  { id: 1, name: "Anne Nader", email: "Rahul.Dare@hotmail.com", role: "NA", company: "NA" },
  { id: 2, name: "Amber Leffler", email: "Mia58@gmail.com", role: "NA", company: "NA" },
  { id: 3, name: "Andres Bosco", email: "Amir.Anderson@hotmail.com", role: "NA", company: "NA" },
  // Add more users...
];

const UserDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const user = allData.find((user) => user.id === parseInt(id)); // Find the user by id

  if (!user) {
    return <div>User not found</div>; // Display if the user doesn't exist
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Company:</strong> {user.company}</p>
      {/* Add any other user details you want to display */}
    </div>
  );
};

export default UserDetail;
