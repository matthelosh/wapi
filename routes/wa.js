const waSender = require('../controllers/wasender')
const router = require('express').Router()

router.post('/send', waSender.sendMsg);

module.exports = router;