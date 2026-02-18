import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/skills", async (req, res) => {
  const { username, skills } = req.body;
  
  let user = await User.findOne({ username});

  if (!user)
    user = new User({ username, skills});
   
  else
    user.skills = skills;

  await user.save();
  res.json({ message: "Skills stored" });
});

export default router;
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    res.json(user);
  } catch {
    res.status(500).json({ error: "User not found" });
  }
});
