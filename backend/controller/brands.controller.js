const { Brand } = require("../models");

exports.getBrands = async (req, res) => {
  const data = await Brand.findAll();
  res.json(data);
};

exports.createBrand = async (req, res) => {
  const partner = await Brand.create(req.body);
  res.json(partner);
};