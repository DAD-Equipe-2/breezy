const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});
