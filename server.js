const helmet = require("helmet");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const users = require("./users/userRouter");
const posts = require("./posts/postRouter");
const server = express();

//Builtin MiddleWare
server.use(express.json());

// Third Party MiddleWare
server.use(cors());
server.use(helmet());
server.use(logger("tiny"));

//Routes
server.use("/api/users/", users);
server.use("/api/posts/", posts);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

module.exports = server;
