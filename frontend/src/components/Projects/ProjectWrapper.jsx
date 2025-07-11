import React, { useState } from "react";
import project_title from "../../assets/img/projects/projects_title.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

// Import images explicitly (adjust paths based on your folder structure)
const projectImages = {
  1: {
    master: require("../../assets/img/projects/1/Background.jpg"),
    additional: [
      require("../../assets/img/projects/1/DSC_7168.jpg"),
      require("../../assets/img/projects/1/DSC_7185.jpg"),
      require("../../assets/img/projects/1/DSC_7188.jpg"),
      require("../../assets/img/projects/1/DSC_7201.jpg"),
      require("../../assets/img/projects/1/DSC_7223.jpg"),
      require("../../assets/img/projects/1/DSC_7240.jpg"),
      require("../../assets/img/projects/1/DSC_7257.jpg"),
    ],
  },
  2: {
    master: require("../../assets/img/projects/2/IMG_5720.JPG"), // Corrected path
    additional: [
      require("../../assets/img/projects/2/IMG_5736.JPG"),
      require("../../assets/img/projects/2/IMG_5738.JPG"),
      require("../../assets/img/projects/2/IMG_5744.JPG"),
      require("../../assets/img/projects/2/IMG_5746.JPG"),
      require("../../assets/img/projects/2/IMG_5770.JPG"),
    ],
  },
  3: {
    master: require("../../assets/img/projects/1/Background.jpg"), // Corrected path
    additional: [
      require("../../assets/img/projects/1/DSC_7168.jpg"), // Corrected path
      require("../../assets/img/projects/1/DSC_7185.jpg"),
      require("../../assets/img/projects/1/DSC_7188.jpg"),
      require("../../assets/img/projects/1/DSC_7201.jpg"),
      require("../../assets/img/projects/1/DSC_7223.jpg"),
      require("../../assets/img/projects/1/DSC_7240.jpg"),
      require("../../assets/img/projects/1/DSC_7257.jpg"),
    ],
  },
};

const ProjectWrapper = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectFolders = [1, 2, 3];
  const projects = projectFolders.map((folder) => ({
    id: folder,
    masterImg: projectImages[folder]?.master || comingsoon,
    additionalImgs: projectImages[folder]?.additional || [],
    alt: `Project ${folder} - Master Image`,
    caption: `Description for Project ${folder}`, // Added caption for HomeWrapper
  }));

  const toggleShowAll = (projectId) => {
    setSelectedProject(projectId);
    setShowAll(true);
  };

  const closeModal = () => {
    setShowAll(false);
    setSelectedProject(null);
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  return (
    <div className="projects-wrapper">
      <img
        src={project_title}
        alt="Projects Page Banner"
        className="projects-page-image"
      />
      <div className="banner-overlay">
        <h2 className="project-title">Our Projects</h2>
        <p className="project-content">
          At Chhabra Marble, we take pride in transforming spaces with our
          premium marble, granite, tiles, and sanitary ware. With over 30 years
          of experience, we have collaborated with architects and interior
          designers to deliver stunning projects, from luxurious residential
          interiors to large-scale commercial installations. Explore our
          portfolio to see how we bring quality, craftsmanship, and innovation
          to every project.
        </p>
      </div>
      <div className="project-gallery">
        {projects.map((project) => (
          <div key={project.id} className="project-image-container">
            <img
              src={project.masterImg}
              alt={project.alt}
              className="project-image"
              onError={(e) => {
                e.target.src = comingsoon;
              }}
            />
            <button
              className="view-all-button"
              onClick={() => toggleShowAll(project.id)}
              aria-label={`View all images for project ${project.id}`}
            >
              View All
            </button>
          </div>
        ))}
      </div>
      {showAll && currentProject && (
        <div className="all-projects-view" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{currentProject.alt}</h3>
            <div className="project-all-images">
              <img
                src={currentProject.masterImg}
                alt={`${currentProject.alt} - Master`}
                className="project-image"
                onError={(e) => {
                  e.target.src = comingsoon;
                }}
              />
              {currentProject.additionalImgs.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${currentProject.alt} - Additional ${index + 1}`}
                  className="project-image"
                  onError={(e) => {
                    e.target.src = comingsoon;
                  }}
                />
              ))}
            </div>
            <button
              className="close-view-button"
              onClick={closeModal}
              aria-label="Close all projects view"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectWrapper;
