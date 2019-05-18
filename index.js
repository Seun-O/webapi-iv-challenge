// code away!
const port = 8000 || process.env.PORT;
const users = require("./users/userRouter");
const posts = require("./posts/postRouter");
const server = require("./server.js");

server.use("/api/users/", users);
server.use("/api/posts/", posts);

server.listen(port, () => {
  console.log(`Server Listening on Port: ${port}`);
});
