const router = require("express").Router();
const controller = require("../controllers/profile");

router.get("/", controller.get);
router.delete("/", controller.delete);
router.patch("/name", controller.patchName);
router.patch("/password", controller.patchPassword);

module.exports = router;