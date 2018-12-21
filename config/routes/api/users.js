//autenthication and login
const express = require("express");
const router = express.Router();

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
  User.findOne({ email: req.body.email });
});

//we have to export the router in order for the server.js to pick it up
module.exports = router;
