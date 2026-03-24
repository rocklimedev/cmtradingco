module.exports = (sequelize, DataTypes) => {
  const Catalogue = sequelize.define("Catalogue", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,
    downloadUrl: DataTypes.STRING,
  });

  return Catalogue;
};