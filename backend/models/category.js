module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,
    banner: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.SubCategory, {
      foreignKey: "categoryId",
      as: "subcategories",
    });
  };

  return Category;
};