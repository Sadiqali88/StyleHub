const Product = require("./models/Product");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const app = express();
const Design = require("./models/Design");
const Order = require("./models/Order");


app.use(express.json());
app.use(cors());




mongoose.connect("mongodb://127.0.0.1:27017/StyleHub")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  res.json(user);
});

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send("Product Added Successfully");
});

app.get("/test-add", async (req, res) => {
  const product = new Product({
    name: "T-shirt",
    price: 500,
    image: "https://via.placeholder.com/200"
  });

  await product.save();
  res.send("Product Added");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send("Product Saved");
});

app.post("/add-design", async (req, res) => {
  const design = new Design(req.body);
  await design.save();
  res.send("Design Added");
});

app.get("/designs", async (req, res) => {
  const designs = await Design.find();
  res.json(designs);
});

app.post("/order", async (req, res) => {
  try {
    console.log(req.body);   // 👈 ADD THIS

    const order = new Order({
      items: req.body.items,
      buyer: req.body.buyer,
      status: "Pending"
    });

    await order.save();

    res.send("Order placed");
  } catch (err) {
    console.log(err);        // 👈 SEE ERROR HERE
    res.status(500).send("Error");
  }
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});