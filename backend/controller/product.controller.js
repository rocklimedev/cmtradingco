const { Product } = require("../models");

exports.getProducts = async (req, res) => {
  const data = await Product.findAll();
  res.json(data);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};