require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

async function sendLine(text) {
  await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: process.env.LINE_USER_ID,
      messages: [
        {
          type: "text",
          text: text,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LINE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}

app.post("/api/contact", async (req, res) => {
  const { name, email, type, message } = req.body;

  console.log(req.body);

  await sendLine(
`📩 มีคนติดต่อใหม่

👤 ชื่อ: ${name}
📧 Email: ${email}
💼 ประเภทงาน: ${type}

📝 ข้อความ:
${message}`
  );

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server Running");
});