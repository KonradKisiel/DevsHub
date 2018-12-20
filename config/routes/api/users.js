//autenthication and login
const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//we have to export the router in order for the server.js to pick it up
module.exports = router;
