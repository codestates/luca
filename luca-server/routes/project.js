const router = require("express").Router();
const controller = require("../controllers/project");

router.get("/", controller.get);
router.post("/", controller.post);
router.patch("/", controller.patch);
router.patch("/accept", controller.accept);
router.delete("/:id", controller.delete);
router.post("/member", controller.member);

module.exports = router;