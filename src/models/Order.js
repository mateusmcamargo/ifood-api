import mongoose     from 'mongoose';
import { baseCrud}  from '../db/baseCrud.js';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
        products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: [
            'pending',
            'approved',
            'delivering',
            'delivered',
            'cancelled'
        ],
        default: 'pending',
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default {
    ...baseCrud(Order),

    findByUser(userId) {
        return Order.find({ userId: userId }).populate('storeId');
    },

    findByStore(storeId) {
        return Order.find({ storeId: storeId }).populate('userId');
    },

    findByStatus(status) {
        return Order.find({
            status: status
        });
    },

    updateStatus(id, status) {
        return Order.findByIdAndUpdate(id, { status }, {
            // new: true, deprecated
            returnDocument: true,
            runValidators: true // enum
        });
    }
};