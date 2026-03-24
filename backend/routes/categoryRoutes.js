const router = require("express").Router();
const controller = require("../controller/category.controller");

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);

module.exports = router;