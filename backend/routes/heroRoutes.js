const express = require('express')
const authenticate = require('../middleware/authenticate')

const router = express.Router();
const { updateHero , getHero} = require('../controllers/heroController')


router.get('/',getHero);
router.put('/',authenticate , updateHero);

module.exports = router;