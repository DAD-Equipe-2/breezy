const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.json({ msg: 'Utilisateur créé' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

  const payload = { user: { id: user.id } };
  jwt.sign(payload, 'secretJWT', { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

module.exports = router;
