const mongoose = require('mongoose');


module.exports = async function authenticateJWT() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.info('✅ MongoDB connected');

    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // process.exit(1);
    }
};