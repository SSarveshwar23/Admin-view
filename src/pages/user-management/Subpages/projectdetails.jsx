import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectName } = useParams(); // Get the project name from URL

  const projectDetails = {
    curso: {
      title: 'Curso Project',
      description: 'Details about the Curso project...',
      members: 12,
    },
    activo: {
      title: 'Activo Project',
      description: 'Details about the Activo project...',
      members: 9,
    },
    liquid: {
      title: 'Liquid Project',
      description: 'Details about the Liquid project...',
      members: 3,
    },
    hrcases: {
      title: 'HR Cases Project',
      description: 'Details about HR Cases...',
      members: 21,
    },
    doctio: {
      title: 'Doctio Project',
      description: 'Details about Doctio...',
      members: 9,
    },
  };

  const project = projectDetails[projectName.toLowerCase()];

  if (!project) {
    return <div>Project not found.</div>; // Handle case where project does not exist
  }

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p><strong>Members:</strong> {project.members}</p>
    </div>
  );
};

export default ProjectDetails;
