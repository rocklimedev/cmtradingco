import React, { useState } from "react";
import project_title from "../../assets/img/projects_banner.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

// Dynamically require all images in the projects folder and its subfolders
const imagesContext = require.context(
  "../../assets/img/projects_data/",
  true,
  /\.(jpe?g|png)$/i
);

// Group images by folder
const projectImages = {};

imagesContext.keys().forEach((key) => {
  const filePath = key.replace("./", ""); // remove leading './'
  const [folder, filename] = filePath.split("/");

  if (!projectImages[folder]) {
    projectImages[folder] = {
      master: null,
      additional: [],
    };
  }

  const image = imagesContext(key);

  if (/background/i.test(filename) || /img_5720/i.test(filename)) {
    projectImages[folder].master = image;
  } else {
    projectImages[folder].additional.push(image);
  }
});

const ProjectWrapper = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = Object.entries(projectImages).map(([folder, images]) => ({
    id: folder,
    masterImg: images.master || comingsoon,
    additionalImgs: images.additional || [],
    alt: `Project ${folder} - Master Image`,
    caption: `Description for Project ${folder}`,
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
        <h2 className="section-title">
          Our Projects <span className="line" />
        </h2>
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
            <div
              className="arrow-overlay"
              onClick={() => toggleShowAll(project.id)}
              aria-label={`View all images for project ${project.id}`}
            >
              →
            </div>
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
