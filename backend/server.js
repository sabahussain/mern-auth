const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const authrouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MONGODB Connected");
});

app.use("/api/auth", authrouter);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
