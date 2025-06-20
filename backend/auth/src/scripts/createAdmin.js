require('dotenv').config();
const mongoose = require('./utils/db');
const User     = require('../models/user.model');
const readline = require('readline');


try {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (question) => new Promise(resolve => rl.question(question, resolve));
 
    await connectDB();

    console.info('Creating admin user...');
    const username = await ask('Enter the username: ');
    const password = await ask('Enter the password: ');

    const existing = await User.findOne({ username: username });
    if (existing) {
        console.log('⚠️ User already exists.');
        return;
    }

    await User.create({
        username: username,
        password: password,
        role: 'admin'
    });

    console.info('Admin user created');
}
catch (err) {
    console.error('❌ Error creating admin user:', err.message);
}
finally {
    rl.close();
}