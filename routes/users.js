var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
const models = require("../models");
const jwt = require('jsonwebtoken')

/* generate user */
router.post('/register', function (req, res) {

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.userPassword, salt, function (err, hash) {
      let user = {
        userName: req.body.userName,
        userId: req.body.userId,
        userPassword: hash
      }

      models.User.create(user).then((response) => {
        res.status(200).json({
          "status": true,
          "msg": "user created successfully",
          "stock": user
        })
      }).catch(err => {
        res.status(500).json({
          "status": false,
          "msg": err.errors[0].message,
          "error": err
        })
      })

    });
  });

});

/* Login user */
router.post('/login', function (req, res) {

  models.User.findOne({
    where: { userId: req.body.userId }
  }).then(response => {
    if (!response) {
      res.status(500).json({
        "status": false,
        "msg": "User not found"
      })
    } else {

      bcrypt.compare(req.body.userPassword, response.userPassword, function (errr, ress) {
        if (ress) {

          var token = jwt.sign({ userId: response.userId }, 'rushi');

          res.status(200).json({
            "status": true,
            "msg": "User logged in successfully",
            "token" : token
          })

        }else{
          res.status(500).json({
            "status": false,
            "msg": "User credentials mismatch"
          })
        }
      });
    }
  })

});

module.exports = router;
