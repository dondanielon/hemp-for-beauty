const { Order } = require("../db");

async function updateOrderStatus(orderId, status) {
  const order = await Order.update(
    { status: status },
    { where: { id: orderId } }
  );
}

module.exports = {
  updateOrderStatus,
};
