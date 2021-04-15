const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config');

const register = async (username, password, repeatPassword) => {
    username = username.username;
    password = password.password;
    repeatPassword = repeatPassword.repeatPassword;
    if (!(password === repeatPassword)) {
        return
    };

    let inUse = await User.findOne({ username: username })
    if (inUse) {
        let message = 'Invalid'
        return message;
    }
    let user = new User({ username, password });
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => {
            user.password = hash;
            return user.save();
        })
    console.log('Succesfully Registered,Enjoy!')
    return user;
};

const login = async (username, password) => {
    let user = await User.findOne({ username });
    if (!user) return;
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return;
    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
    return { token, user };
};
const auth = async (token) => {
    let userId = {};
    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                return
            } else {
                userId = decoded._id;
            };
        });
        let user = await User.findById(userId);
        return user;
    };
};

module.exports = {
    register,
    login,
    auth
}