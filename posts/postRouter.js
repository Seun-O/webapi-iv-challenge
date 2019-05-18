const express = require("express");

const router = express.Router();

const db = require("./postDb");

router.get("/", async (req, res) => {
  try {
    const data = await db.get();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.get("/:id", validatePostId, async (req, res) => {
  try {
    const data = await db.getById(req.post.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.delete("/:id", validatePostId, async (req, res) => {
  try {
    const data = await db.remove(req.post.id);
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

router.put("/:id", validatePostId, async (req, res) => {
  const change = req.body;
  try {
    const data = await db.update(req.post.id, change);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  try {
    const postId = await db.getById(id);
    if (postId) {
      req.post = postId;
      next();
    } else {
      res.status(404).json({ message: "Invalid post ID" });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
}

module.exports = router;
