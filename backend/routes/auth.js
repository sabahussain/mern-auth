const authrouter = require("express").Router();
const { register, login, logout } = require("../controllers/authController");

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);

// const auth = require("../middleware/authMiddleware");
// authrouter.get("/profile", auth, async (req, res) => {
//   const user = await User.findById(req.user).select("-password");
//   res.json(user);
// });

module.exports = authrouter;
