const express = require("express");

const router = express.Router();

const db = require("./userDb");
const dbPost = require("../posts/postDb");

router.post("/", validateUser, async (req, res) => {
  const user = req.body;
  try {
    const data = await db.insert(user);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  const { text } = req.body;
  const post = {
    text: text,
    user_id: req.user.id
  };
  try {
    const data = await dbPost.insert(post);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await db.get();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const data = await db.getById(req.user.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const data = await db.getUserPosts(req.user.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const data = await db.remove(req.user.id);
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  const user = req.body;
  try {
    const data = await db.update(req.user.id, user);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "Invalid user id" });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  console.log(body);
  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "Missing user data" });
    } else if (!body.name) {
      res.status(400).json({ message: "Missing required name field" });
    }
    next();
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "Missing post data" });
    } else if (!body.text) {
      res.status(400).json({ message: "Missing required text field" });
    }
    next();
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
}

module.exports = router;
