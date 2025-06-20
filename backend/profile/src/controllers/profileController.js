const Profile = require('../models/Profile');

// Créer ou mettre à jour un profil
exports.upsertProfile = async (req, res) => {
    try {
        const { user, bio, avatar, location, website } = req.body;
        const profile = await Profile.findOneAndUpdate(
            { user },
            { bio, avatar, location, website },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtenir un profil par user ID
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
