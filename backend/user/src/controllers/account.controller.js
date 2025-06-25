const User = require('../models/user.model');

const SERVICE_URL = 'http://localhost:8080/api/v1/users';


exports.createUser = async (req, res) => {
    const { nickname } = req.body;
    const username     = req.headers['x-user-name'];

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({
            username: username,
            nickname: nickname,
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getUser = async (req, res) => {
    const username = req.params.username || req.headers['x-user-name'];

    try {
        const user = await User.findOne({ username: username })
        .select('-_id username nickname bio createdAt');

        // Check if user exists
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateProfile = async (req, res) => {
    const { nickname, bio } = req.body;
    const username = req.headers['x-user-name'];

    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update the user's profile
        user.nickname = nickname || user.nickname;
        user.bio = bio || user.bio;

        await user.save();
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// exports.deleteProfile = async (req, res) => {
//     const username = req.headers['x-user-name'];

//     try {
//         const user = await User.findOneAndDelete({ username: username });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         return res.status(200).json({ message: 'Profile deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };


exports.getAvatar = async (req, res) => {
    const username = req.params.username || req.headers['x-user-name'];
    try {
        const user = await User.findOne({ username: username })
        .select('-_id avatar');

        // Check if user exists
        if (!user) return res.status(404).send('User not found');

        // Check if user has an avatar
        if (!user.avatar || !user.avatar.data) {
            res.set('Content-Type', 'image/jpeg');
            return res.sendFile('default-avatar.jpg', { root: './public' });
        }
        
        res.set('Content-Type', user.avatar.contentType);
        return res.send(user.avatar.data);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateAvatar = async (req, res) => {
    const username = req.headers['x-user-name'];
    const avatar   = req.file;

    try {
        if (!avatar) {
            return res.status(400).json({ message: 'No avatar file provided' });
        }

        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update the user's avatar
        user.avatar.data = avatar.buffer;
        user.avatar.contentType = avatar.mimetype;

        await user.save();
        return res.status(200).json({ message: 'Avatar uploaded successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getUsersByUsernames = async (req, res) => {
    let usernames = req.query.usernames;
    
    try {
        // Convert usernames to an array if it's a string
        if (typeof usernames === 'string') {
            usernames = usernames.split(',').map(name => name.trim());
        }

        if (!Array.isArray(usernames) || usernames.length === 0) {
            return res.status(400).json({ message: 'Invalid usernames' });
        }
    
        const users = await User.find({ username: { $in: usernames } })
            .select('-_id username nickname')
            .lean();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const enrichedUsers = users.map(user => ({
            ...user,
            avatarUrl: `${SERVICE_URL}/${user.username}/avatar`
        }));

        return res.status(200).json(enrichedUsers);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}