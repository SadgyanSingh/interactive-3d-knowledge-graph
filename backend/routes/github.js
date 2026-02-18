import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/repos", async (req, res) => {
  try {
    const { token } = req.query;

    const response = await axios.get(
        "https://api.github.com/user/repos",
        {
          headers: {
            Authorization: `Bearer ${token}`
         }
        }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

export default router;