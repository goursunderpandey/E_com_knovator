const fs = require("fs");
const path = require("path");

const ORDERS_FILE_PATH = path.join(__dirname, "../../../Data/allOrders.json");

const readOrdersFromFile = () => {
  try {
    if (!fs.existsSync(ORDERS_FILE_PATH)) {
     
      fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }

    const data = fs.readFileSync(ORDERS_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading orders file:", error);
    return [];
  }
};

const writeOrdersToFile = (orders) => {
  try {
  
    const dir = path.dirname(ORDERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing orders file:", error);
    return false;
  }
};


exports.getallorders = () => {
  return readOrdersFromFile();
};

exports.createorder = (data) => {
  const orders = readOrdersFromFile();

  const neworder = {
    id: orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1,
    ...data,
    orderDate: new Date().toISOString(),
    status: "Placed",
  };

  orders.push(neworder);

  if (writeOrdersToFile(orders)) {
    return neworder;
  } else {
    throw new Error("Failed to save order to file");
  }
};
