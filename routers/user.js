const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const userController = require('../controllers/user');
const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userEamilExist => {
                    if (userEamilExist) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .not()
            .isEmpty(),
        body('address')
            .not()
            .isEmpty()
    ],
    userController.signup
);

router.post('/login', userController.login);
module.exports = router;
