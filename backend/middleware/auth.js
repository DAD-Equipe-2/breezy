const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });

  try {
    const decoded = jwt.verify(token, 'secretJWT');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token invalide' });
  }
};
