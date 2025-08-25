

const express = require('express'); 
const getallitem = require('../controllers/getAllItem');
const generate = require('../controllers/generate');
const { googleLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/generate', generate); 
router.get("/google", googleLogin); 
router.get("/getitem", getallitem); 

module.exports = router;
