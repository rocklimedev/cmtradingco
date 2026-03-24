module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("Partner", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
  });

  return Brand;
};