const { Category, SubCategory } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: SubCategory, as: "subcategories" }],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { id, name, image, banner, subcategories } = req.body;

    const category = await Category.create({ id, name, image, banner });

    if (subcategories?.length) {
      const subs = subcategories.map((s) => ({
        ...s,
        categoryId: id,
      }));
      await SubCategory.bulkCreate(subs);
    }

    res.json({ message: "Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};