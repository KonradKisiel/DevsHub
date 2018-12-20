//location, bio, experience, education, social networks links
const express = require("express");
const router = express.Router();

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//we have to export the router in order for the server.js to pick it up
module.exports = router;
