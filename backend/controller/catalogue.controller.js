const { Catalogue } = require("../models");

exports.getCatalogues = async (req, res) => {
  try {
    const data = await Catalogue.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCatalogue = async (req, res) => {
  try {
    const catalogue = await Catalogue.create(req.body);
    res.json(catalogue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCatalogue = async (req, res) => {
  try {
    await Catalogue.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};