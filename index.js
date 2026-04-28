import { connect }  from './src/db/connect.js';
import { errorLog } from './src/log/logger.js';
import User     from './src/models/User.js';
import Store    from './src/models/Store.js';
import Product  from './src/models/Product.js';
import Order    from './src/models/Order.js';
import { buildOrdersData, buildProductsData, storesData, usersData } from './src/db/data.js';

async function main() {
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

async function seedData() {

    let users = []; // used for building orders (because of the user_id field)
    for (const userData of usersData) {
        try {
            const user = await User.save(userData);
            users.push(user);
            console.log('usuário criado: ' + user);
        }
        catch(error) {
            errorLog(error.message, 'User.save');
            process.exit(1); // no user = no user_id in order
        }
    }

    let stores = [];
    for (const storeData of storesData) {
        try {
            const store = await Store.save(storeData);
            stores.push(store);
            console.log('loja criada: ' + store);
        } catch (error) {
            errorLog(error.message, 'Store.save');
            process.exit(1); // no store = no store_id in order or products
        }
    }

    let products = [];
    for (const productData of buildProductsData(stores)) {
        try {
            const product = await Product.save(productData);
            products.push(product);
            console.log('produto criado:' + product);
        } catch (error) {
            errorLog(error.message, 'Product.save');
            process.exit(1); // no store = no product_id in order
        }
    }

    // no array, since there's no other model depending on this
    for (const orderData of buildOrdersData(users, stores, products)) {
        try {
            const order = await Order.save(orderData);
            console.log('pedido criado:', order);
        }
        catch(error) {
            errorLog(error.message, 'Order.save');
        }
    }
}

async function orderStatusChain(orderId) {

}

await connect();
seedData();