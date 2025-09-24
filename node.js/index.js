const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

const productRoute = require("./src/Product/Route/Product.route");
const orderRoute = require("./src/Order/Route/Order.route");

app.use("/orders", orderRoute);
app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.send("Api work good");
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
