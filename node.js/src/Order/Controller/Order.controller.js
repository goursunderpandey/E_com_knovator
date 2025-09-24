const OrderModal = require("../Modal/Order.modal");

exports.getallorders = (req, res) => {
  try {
    const orders = OrderModal.getallorders();
    return res.status(201).json(orders);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
exports.createorder = (req, res) => {
  try {
    const { firstName, lastName, address, items } = req.body;
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !items.length
    ) {
      return res.status(401).json({ message: "fill all required field " });
    }

    const order = OrderModal.createorder(req.body);
    console.log(" Order palced sucessfully", order);

    return res.status(201).json(order);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
