const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  buyer: String,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);

