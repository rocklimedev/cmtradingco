const router = require("express").Router();
const controller = require("../controller/brands.controller");

router.get("/", controller.getBrands);
router.post("/", controller.createBrand);

module.exports = router;