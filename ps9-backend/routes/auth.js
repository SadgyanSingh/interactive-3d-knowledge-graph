import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/github", async (req, res) => {
    const { code } = req.body;

    const tokenRes = await axios.post(
        "https://github.com/login/outh/access_token",
        {
            client_id: process.env.GITHUB_ID,
            client_secret: process.env.GITHUB_SECRET,
            code
        },
        { headers: {Accept: "application/json" } }
    );

    res.json(tokenRes.data);
});

export default router;