import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ai-food');
        console.info('banco conectado!');
        console.log('state:', mongoose.connection.readyState);
    }
    catch(error) {
        throw new Error(`falha ao conectar ao banco: ${error.message}`);
    }
}