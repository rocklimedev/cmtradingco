const imagesContext = require.context(
  "../../assets/img/projects_data/",
  true,
  /\.(jpe?g|png)$/i
);

const loadProjectImages = () => {
  const projectImages = {};

  imagesContext.keys().forEach((key) => {
    const filePath = key.replace("./", "");
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

  return Object.entries(projectImages).map(([folder, images]) => ({
    id: folder,
    imgSrc:
      images.master ||
      require("../../assets/img/projects/home-image-coming-soon.jpg"),
    alt: `Project ${folder} - Master Image`,
    caption: `Description for Project ${folder}`,
  }));
};

export default loadProjectImages;
