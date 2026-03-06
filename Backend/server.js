const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { OpenAI } = require("openai")

const app = express()

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post("/chat", async (req,res) => {

  const message = req.body.message

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role:"system", content:"You are a professional dietitian"},
      {role:"user", content: message}
    ]
  })

  res.json({
    reply: response.choices[0].message.content
  })
})

app.listen(5000,()=>{
  console.log("Server running on port 5000")
})