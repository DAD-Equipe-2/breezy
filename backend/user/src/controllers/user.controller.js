const User = require('../models/user.model');


exports.createUser = async (req, res) => {
    const { nickname } = req.body;
    const username     = req.headers['x-user-name'];

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const newUser = new User({
            username: username,
            nickname: nickname,
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
};


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


exports.getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers', 'username avatar');
        res.json(user.followers);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


exports.getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following', 'username avatar');
        res.json(user.following);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};