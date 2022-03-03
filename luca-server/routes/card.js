const { cards } = require("../models");
// const controller = require('../controllers/card');

router.post('/', controller.post);
router.get('/:projectId', controller.get);
router.delete('/:id', controller.delete);