const router = require("express").Router();
const controller = require("../controller/product.controller");

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);

module.exports = router;