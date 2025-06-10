const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const router = express.Router();



app.use(express.json());
app.use(cors());

// mongoose.connect(process.env.MONGO_URI);
// app.use('/api/auth', require('./routes/authRoutes'));


app.get('/api/v1/auth', (req, res) => {
  res.send('Bienvenue sur le service d\'authentification');
});


// app.use('/', router);       // Works with gateway
// app.use('/api/v1/auth', router);   // Works standalone

app.listen(3001, () => {
  console.log('Serveur démarré sur le port 3001');
});
