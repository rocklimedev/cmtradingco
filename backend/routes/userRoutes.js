const router = require("express").Router();
const controller = require("../controller/users.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", controller.getUsers);
router.delete("/:id", controller.deleteUser);

module.exports = router;