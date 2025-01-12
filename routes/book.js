const bookController = require('../controllers/book')
const router = require('express').Router();

router.post('/', bookController.create);
router.get('/:id', bookController.get);


module.exports = router;