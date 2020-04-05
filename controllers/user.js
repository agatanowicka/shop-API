const { validationResult } = require('express-validator/check');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.statusCode = 422;
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const adress = req.body.adress;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                adress: adress
            })
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          error.statusCode = 401;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          error.statusCode = 401;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'extrasupersecretkey',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
      });
};
