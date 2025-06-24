const User = require('../models/user.model');

const SERVICE_URL = 'http://localhost:8080/api/v1/users';


exports.getFollowers = async (req, res) => {
    const username = req.params.username || req.headers['x-user-name'];
    try {
        const user = await User.findOne({ username: username })
        .populate('followers', 'username nickname avatar');

        // Check if user exists
        if (!user) return res.status(404).json({ error: 'User not found' });

        const followersWithAvatarUrl = user.followers.map(follower => {
            return {
                username: follower.username,
                nickname: follower.nickname,
                avatarUrl: `${SERVICE_URL}/${follower.username}/avatar`
            };
        });

        return res.status(200).json(followersWithAvatarUrl);
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getFollowing = async (req, res) => {
    const username = req.params.username || req.headers['x-user-name'];
    try {
        const user = await User.findOne({ username: username })
        .populate('following', 'username nickname avatar');

        // Check if user exists
        if (!user) return res.status(404).json({ error: 'User not found' });

        const followingWithAvatarUrl = user.following.map(followed => {
            return {
                username: followed.username,
                nickname: followed.nickname,
                avatarUrl: `${SERVICE_URL}/${followed.username}/avatar`
            };
        });

        return res.status(200).json(followingWithAvatarUrl);
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


exports.isFollowing = async (req, res) => {
    const username = req.headers['x-user-name'];
    const targetUsername = req.params.username;

    if (username === targetUsername) return res.status(400).json({ error: 'You cannot check following status for yourself' });
    try {
        // Check if the target user exists
        if (!targetUsername) return res.status(400).json({ error: 'Target username is required' });

        // Check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const targetUser = await User.findOne({ username: targetUsername });
        if (!targetUser) return res.status(404).json({ error: 'Target user not found' });

        const isFollowing = user.following.some(id => id.equals(targetUser._id));

        return res.status(200).json({ isFollowing });
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


exports.followUser = async (req, res) => {
    const username = req.headers['x-user-name'];
    const targetUsername = req.params.username;

    if (username === targetUsername) return res.status(400).json({ message: 'You cannot follow yourself' });
    try {
        // Check if the target user exists
        const targetUser = await User.findOne({ username: targetUsername });
        if (!targetUser) return res.status(404).json({ message: 'Target user not found' });

        // Check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the user is already following the target user
        if (user.following.some(id => id.equals(targetUser._id))) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Update the following and followers lists
        await Promise.all([
            User.findOneAndUpdate(
                { username: username },
                { $addToSet: { following: targetUser._id } },
                { new: true }
            ),
            User.findOneAndUpdate(
                { username: targetUsername },
                { $addToSet: { followers: username } },
                { new: true }
            )
        ]);

        return res.status(200).json({ message: 'Followed successfully' });
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


exports.unfollowUser = async (req, res) => {
    const username = req.headers['x-user-name'];
    const targetUsername = req.params.username;

    if (username === targetUsername) return res.status(400).json({ message: 'You cannot unfollow yourself' });
    try {
        // Check if the target user exists
        const targetUser = await User.findOne({ username: targetUsername });
        if (!targetUser) return res.status(404).json({ message: 'Target user not found' });

        // Check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the user is following the target user
        if (!user.following.some(id => id.equals(targetUser._id))) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Update the following and followers lists
        await Promise.all([
            User.findOneAndUpdate({ username: username }, { $pull: { following: targetUser._id } }, { new: true }),
            User.findOneAndUpdate({ username: targetUsername }, { $pull: { followers: user._id } }, { new: true })
        ]);

        return res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};