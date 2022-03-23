import * as express from "express";
import * as controller from "../controllers/profile";
const router = express.Router();

router.get("/", controller.get);
router.delete("/", controller.deleteProfile);
router.patch("/name", controller.patchName);
router.patch("/password", controller.patchPassword);

export default router;