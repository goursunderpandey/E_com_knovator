const Product = require("../Modal/Product.modal");

exports.getproduct = (req, res) => {
  try {
    const product = Product.getallproduct();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
