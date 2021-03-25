const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async readAll() {
    const orders = await Order.selectAll();

    return orders;
  }

  static async readId(id) {
    const order = await Order.selectId(id);

    return order;
  }

  static async update({ quantity }, id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} updated for ${quantity}`
    );

    const order = await Order.updateId(quantity, id);

    return order;
  }

  static async delete(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} has been deleted`
    );

    const order = await Order.deleteId(id);

    return order;
  }
};