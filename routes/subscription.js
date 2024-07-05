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
const { getSubscription } = require('../controllers/subcription/getSubscription')

router.post('/createSubscription' , createSubscription);
router.post('/updateTrainer', Authentication , updateTrainer);
router.get('/getSubscription', Authentication , getSubscription);

module.exports = router