//users posts and coments
const express = require("express");
//
const router = express.Router();

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//we have to export the router in order for the server.js to pick it up
module.exports = router;
