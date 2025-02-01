const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// AI Tutor API Route
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4-turbo",
                messages: [
                    { role: "system", content: "You are a friendly Python tutor for kids." },
                    { role: "user", content: message }
                ],
                max_tokens: 150,
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Failed to get response from AI" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
