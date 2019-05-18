// code away!
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const server = require("./server.js");

server.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
});
