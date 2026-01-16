const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: { type: String, unique: true },
});
const User = mongoose.model("User", UserSchema);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { User, Product };
