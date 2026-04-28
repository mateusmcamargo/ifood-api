import mongoose from 'mongoose';
import 'dotenv/config';

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.info('banco conectado!');
        console.log('state:', mongoose.connection.readyState);
    }
    catch(error) {
        throw new Error(`falha ao conectar ao banco: ${error.message}`);
    }
}