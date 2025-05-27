import React, { useState } from "react";
import project_title from "../../assets/img/projects/projects_title.png";

const ProjectWrapper = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    { id: 1, imgSrc: "", alt: "Residential Marble Installation" },
    { id: 2, imgSrc: "", alt: "Commercial Granite Flooring" },
    { id: 3, imgSrc: "", alt: "Luxury Tile Design" },
    { id: 4, imgSrc: "", alt: "Sanitary Ware Showroom" },
    { id: 5, imgSrc: "", alt: "Kota Stone Pathway" },
    { id: 6, imgSrc: "", alt: "Interior Marble Cladding" },
    { id: 7, imgSrc: "", alt: "Granite Countertop Installation" },
    { id: 8, imgSrc: "", alt: "Tile Mosaic Artwork" },
    { id: 9, imgSrc: "", alt: "Commercial Flooring Project" },
    { id: 10, imgSrc: "", alt: "Residential Bathroom Renovation" },
    { id: 11, imgSrc: "", alt: "Outdoor Stone Facade" },
    { id: 12, imgSrc: "", alt: "Marble Staircase Design" },
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <main className="projects-wrapper">
      <img
        src={project_title}
        alt="Projects Page Banner"
        className="projects-page-image"
      />
      <h2 className="project-title">Our Projects</h2>
      <p className="project-content">
        At Chhabra Marble, we take pride in transforming spaces with our premium
        marble, granite, tiles, and sanitary ware. With over 30 years of
        experience, we have collaborated with architects and interior designers
        to deliver stunning projects, from luxurious residential interiors to
        large-scale commercial installations. Explore our portfolio to see how
        we bring quality, craftsmanship, and innovation to every project.
      </p>
      <div className="project-gallery">
        {projects.map((project) => (
          <div key={project.id} className="project-image-container">
            <img
              src={project.imgSrc}
              alt={project.alt}
              className="project-image"
              onClick={() => openLightbox(project)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img
              src={selectedImage.imgSrc}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectWrapper;
