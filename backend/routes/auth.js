const router = require("express").Router();
const {User,Product} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  console.log("user registration data", user);
  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

module.exports = router;
