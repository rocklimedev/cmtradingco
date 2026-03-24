const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const db = {};

// Load all models dynamically
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== "index.js" &&
      file.endsWith(".js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes
    );

    db[model.name] = model;
  });

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;