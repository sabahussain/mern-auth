const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./routes/auth");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MONGODB Connected");
});

app.use("/api/auth", route);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
