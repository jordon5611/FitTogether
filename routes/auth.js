const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { login } = require('../controllers/auth/login')
const { signup } = require('../controllers/auth/signup')
const { getSignupQuestions } = require('../controllers/auth/getSignupQuestions');
const { updateSignupQuestions } = require('../controllers/auth/updateSignupQuestions');
const { updateInformation } = require('../controllers/auth/updateInformation')
const { changePassword } = require('../controllers/auth/changePassword')
const { sendOptToEmail, checkOTP, setNewPassword } = require('../controllers/auth/forgetPassword')
const { getUser } = require('../controllers/auth/getUser')
//const { setProfileImage } = require('../controllers/auth/setProfileImage')

router.post('/login',
  [
    body('email').not().notEmpty().isEmail().withMessage('Invalid email address'),
    body('password').not().notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ], validatorMiddleware,
  login)

router.post('/signup',
  [
    body('fname').not().notEmpty().isLength({ min: 3 }).withMessage('Invalid First Name'),
    body('lname').not().notEmpty().isLength({ min: 3 }).withMessage('Invalid Last Name'),
    body('email').not().notEmpty().isEmail().withMessage('Invalid email address'),
    body('password').not().notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('userType').optional().isIn(['admin', 'user', 'trainer']).withMessage('Invalid user type'),
  ], validatorMiddleware,
  signup)

router.get('/getSignupQuestions', getSignupQuestions)

router.patch('/updateInformation', Authentication,
  [
      body('fname').optional().isLength({ min: 3 }).withMessage('Invalid First Name'),
      body('lname').optional().isLength({ min: 3 }).withMessage('Invalid Last Name'),
      body('email').optional().isEmail().withMessage('Invalid email address'),
      body('bio').optional().isString().withMessage('Invalid Bio'),
      body('preferences').optional().isString().withMessage('Invalid preferences'),
      body('goals').optional().isString().withMessage('Invalid goals'),
      body('healthStatus').optional().isString().withMessage('Invalid health status'),
      body('fitnessLevel').optional().isString().withMessage('Invalid fitness level'),
   ],validatorMiddleware, 
  updateInformation)

router.patch('/changePassword', Authentication,
   [
      body('currentpassword').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('newpassword').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   ],validatorMiddleware,
  changePassword)

router.post('/forgetPassword/sendOptToEmail',
   [
     body('email').not().notEmpty().isEmail().withMessage('Invalid email address')
   ],validatorMiddleware, 
  sendOptToEmail)

router.post('/forgetPassword/checkOTP', Authentication,
   [
      body('code').not().notEmpty().isNumeric().withMessage('Invalid email address')
   ],validatorMiddleware, 
  checkOTP)

router.patch('/forgetPassword/setNewPassword', Authentication,
   [
      body('password').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   ],validatorMiddleware,
  setNewPassword)

router.get('/getUser/:userId', Authentication, [
  param('userId').not().notEmpty().isMongoId().withMessage('Invalid userId')
], validatorMiddleware
,getUser)

router.patch('/updateSignupQuestions', Authentication,
  [
    //body('fitnessGoals').not().notEmpty().isString().withMessage('Invalid fitness goals'),
    body('currentWorkoutRoutine').not().notEmpty().isString().withMessage('Invalid current workout routine'),
    body('dietaryRestrictions').not().notEmpty().isString().withMessage('Invalid dietary restrictions'),
    body('medicalConditions').not().notEmpty().isString().withMessage('Invalid medical conditions'),
    body('preferredWorkoutTime').not().notEmpty().isString().withMessage('Invalid preferred workout time'),
    body('workoutFrequency').not().notEmpty().isString().withMessage('Invalid workout frequency'),
    body('previousInjuries').not().notEmpty().isString().withMessage('Invalid previous injuries'),
    body('currentFitnessLevel').not().notEmpty().isString().withMessage('Invalid current fitness level')
  ], validatorMiddleware,
  updateSignupQuestions);

// router.post('/setProfileImage', Authentication, upload.single("profileImage"), setProfileImage)

module.exports = router