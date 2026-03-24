const router = require("express").Router();
const controller = require("../controller/contact.controller");

router.post("/", controller.createContact);
router.get("/", controller.getContacts);
router.put("/:id/status", controller.updateStatus);
router.delete("/:id", controller.deleteContact);

module.exports = router;