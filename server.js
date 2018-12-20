const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello World"));

//to deploy to heroku use process.env.PORT, otherwise localhost:5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
