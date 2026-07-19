const express = require('express')
const authenticate = require('../middleware/authenticate')

const router = express.Router();
const { updateHero , getHero} = require('../controllers/heroController')


router.get('/hero',getHero);
router.put('/hero',authenticate , updateHero);

module.exports = router;