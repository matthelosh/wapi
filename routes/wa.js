const waSender = require('../controllers/wasender')
const router = require('express').Router()
const {isAuth}  = require('../middleware/isAuth')

router.post('/send', isAuth, waSender.sendMsg);

module.exports = router;