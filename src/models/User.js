import mongoose     from 'mongoose';
import { baseCrud}  from '../db/baseCrud.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default {
    ...baseCrud(User),

    async findByEmail(email) {
        return User.findOne({
            email: email
        });
    },
}