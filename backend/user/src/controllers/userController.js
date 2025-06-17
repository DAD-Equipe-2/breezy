const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Créer utilisateur
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtenir utilisateur par ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
};
