import * as express from "express";
import * as controller from "../controllers/project";
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.post);
router.patch("/", controller.patch);
router.patch("/accept", controller.accept);
router.delete("/:id", controller.deleteProject);
router.post("/member", controller.member);

export default router;