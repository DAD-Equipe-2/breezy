const User = require('../models/User');

exports.searchUsers = async (req, res) => {
    const { query } = req.query;

    try {
        const users = await User.find({
            username: { $regex: query, $options: 'i' }  // recherche insensible à la casse
        }).select('-password'); // exclure le mot de passe

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche d'utilisateurs", error });
    }
};
