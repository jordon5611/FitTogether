const express = require('express');


//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')

//Controller
const { addMessage } = require('../controllers/message/addMessage');
const { getMessages } = require('../controllers/message/getMessages');


//Router
const router = express.Router()

router.post('/addMessage', Authentication , addMessage)
router.post('/getMessages', Authentication , getMessages)

module.exports = router