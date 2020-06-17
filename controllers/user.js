const { validationResult } = require('express-validator/check');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config()

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(422);
      return;
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const address = req.body.address;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                address: address,
                isAdministrator:false,
            })
            return user.save();
        })
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
           res.send(500);
        });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          res.send(401);
          return
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          res.send(401);
          return
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          process.env.KEY,
          { expiresIn: '1h' }
        );
        return res.json({ token: token, userId: loadedUser._id.toString(), isAdministrator:loadedUser.isAdministrator });
      })
      .catch(err => {
        res.send(500);
      });
};
