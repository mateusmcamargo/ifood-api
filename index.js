import { connect }  from './src/db/connect.js';
import { errorLog } from './src/log/logger.js';
import User     from './src/models/User.js';
import Store    from './src/models/Store.js';
import Product  from './src/models/Product.js';
import Order    from './src/models/Order.js';

async function main() {
    await connect();

  // --- User ---
  let user;
  try {
    user = await User.save({
      name: 'João Marcos',
      email: 'joao2@email.com'
    });
    console.log('usuário criado:', user);
  } catch (error) {
    errorLog(error.message, 'User.save');
    process.exit(1); // no user = no user_id in order
  }

  // --- Store ---
  let store;
  try {
    store = await Store.save({
      name: 'Pizza Express',
      category: 'pizza',
      address: 'Av. Brasil, 123'
    });
    console.log('loja criada:', store);
  } catch (error) {
    errorLog(error.message, 'Store.save');
    process.exit(1); // no store = no store_id in order
  }

  // --- Product ---
  let product;
  try {
    product = await Product.save({
      name: 'Pizza Margherita',
      price: 45.90,
      storeId: store._id
    });
    console.log('produto criado:', product);
  } catch (error) {
    errorLog(error.message, 'Product.save');
  }

  // --- Realizar pedido ---
  let order;
  try {
    order = await Order.save({
      userId: user._id,
      storeId: store._id,
      products: [product._id],
      total: 45.90
    });
    console.log('pedido criado:', order);
  } catch (error) {
    errorLog(error.message, 'Order.save');
  }

  // --- Aprovação pela loja ---
  try {
    const approved = await Order.updateStatus(order._id, 'approved');
    console.log('pedido aprovado:', approved);
  } catch (error) {
    errorLog(error.message, 'Order.updateStatus/approved');
  }

  // --- Envio para o cliente ---
  try {
    const delivering = await Order.updateStatus(order._id, 'delivering');
    console.log('pedido em entrega:', delivering);
  } catch (error) {
    errorLog(error.message, 'Order.updateStatus/delivering');
  }

  // --- Entregue ---
  try {
    const delivered = await Order.updateStatus(order._id, 'delivered');
    console.log('pedido entregue:', delivered);
  } catch (error) {
    errorLog(error.message, 'Order.updateStatus/delivered');
  }
}

main();