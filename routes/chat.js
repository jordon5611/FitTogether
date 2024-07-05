const express = require('express');


//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')

//Controller
const { createChat } = require('../controllers/chat/createChat');
const { findChat } = require('../controllers/chat/findChat');
const { userChats } = require('../controllers/chat/userChats');

//Router
const router = express.Router()

router.post('/createChat', Authentication , createChat)
router.get('/userChats', Authentication , userChats)
router.get('/findChat/:userId1/:userId2', Authentication, findChat)


module.exports = router