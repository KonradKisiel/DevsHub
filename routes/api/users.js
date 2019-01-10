//autenthication and login
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  //check if the email already exist in DB
  //findOne use promise
  User.findOne({ email: req.body.email }).then(user => {
    //if user with that email adress exists
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //https://github.com/emerleite/node-gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      //get salt and generate hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log);
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login user/ Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email })
    .then(user => {
      //Check for user
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }
      //Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        //if password match
        if (isMatch) {
          res.json({ msg: 'Success' });
        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      })
    });
});


//we have to export the router in order for the server.js to pick it up
module.exports = router;
