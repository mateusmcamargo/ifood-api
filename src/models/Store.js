import mongoose     from 'mongoose';
import { baseCrud}  from '../db/baseCrud.js';

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'generic',
            'pizza',
            'burger',
            'japanese',
            'brazilian',
            'chinese',
            'bakery',
            'healthy',
            'desserts',
            'drinks',
            'grocery'
        ],
        default: 'generic',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

export default {
    ...baseCrud(Store),

    findByCategory(category) {
        return Store.find({
            category: category
        });
    }
};