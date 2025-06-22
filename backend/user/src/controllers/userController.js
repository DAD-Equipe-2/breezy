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

// Suivre un utilisateur
exports.followUser = async (req, res) => {
    const me = req.params.id;
    const target = req.body.targetId;
    if (me === target) return res.status(400).json({ error: "Cannot follow yourself" });
    try {
        const [ userMe, userTarget ] = await Promise.all([
            User.findByIdAndUpdate(me,    { $addToSet: { following: target } }, { new: true }),
            User.findByIdAndUpdate(target,{ $addToSet: { followers: me } },   { new: true })
        ]);
        res.json({ me: userMe, target: userTarget });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Unfollow
exports.unfollowUser = async (req, res) => {
    const me = req.params.id;
    const target = req.body.targetId;
    try {
        const [ userMe, userTarget ] = await Promise.all([
            User.findByIdAndUpdate(me,    { $pull: { following: target } }, { new: true }),
            User.findByIdAndUpdate(target,{ $pull: { followers: me } },   { new: true })
        ]);
        res.json({ me: userMe, target: userTarget });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Récupérer followers
exports.getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers', 'username avatar');
        res.json(user.followers);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Récupérer following
exports.getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following', 'username avatar');
        res.json(user.following);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};