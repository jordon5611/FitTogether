const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { createSubscription } = require('../controllers/subcription/createSubscription')
const { updateTrainer } = require('../controllers/subcription/updateTrainer')

router.post('/createSubscription', Authentication , createSubscription);
router.post('/updateTrainer', Authentication , updateTrainer);

module.exports = router