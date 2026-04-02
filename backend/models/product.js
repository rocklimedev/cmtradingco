module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return Product;
};