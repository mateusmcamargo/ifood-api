import mongoose     from 'mongoose';
import { baseCrud}  from '../db/baseCrud.js';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default {
    ...baseCrud(Product),

    findByStore(storeId) {
        return Product.find({ storeId: storeId }).populate('storeId');
    }
};