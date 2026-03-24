const router = require("express").Router();
const controller = require("../controller/catalogue.controller");

router.get("/", controller.getCatalogues);
router.post("/", controller.createCatalogue);
router.delete("/:id", controller.deleteCatalogue);

module.exports = router;