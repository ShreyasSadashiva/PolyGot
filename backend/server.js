const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { messages } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.VITE_AI_KEY,
    baseURL: process.env.VITE_AI_URL,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.chat.completions.create({
    model: process.env.VITE_AI_MODEL,
    messages,
  });
  res.send(response.choices[0].message.content);
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
