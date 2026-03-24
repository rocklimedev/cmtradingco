module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("SubCategory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
  };

  return SubCategory;
};