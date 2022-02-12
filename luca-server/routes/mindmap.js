const router = require('express').Router();
const controller = require('../controllers/mindmap');

router.patch('/connect', controller.connect);
router.patch('/disconnect', controller.disconnect);
router.patch('/alone', controller.alone);
router.get('/:projectId', controller.get);

module.exports = router;