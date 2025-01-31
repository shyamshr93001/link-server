const Users = require('../model/user');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

dotenv.config();


exports.createUser = async (req, res) => {
    try {
        const {email, username, password, firstname, lastname} = req.body;
        console.log("Creating user");
        const user = new Users({
            email: email,
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
        });
        console.log(user);
        await user.save();
        res.send("created")
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving data');
    }
};

exports.getUser = async (req, res) => {

    try {
        console.log("shyam")
        console.log(req.body)
        const user = await Users.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }]
        }).exec();
        console.log(user)
        res.send(user);
    } catch (err) {
        console.error('Error getting user:', err);
    }
};

exports.loginUser = async (req, res) => {

    try {
        const user = await Users.findOne({
            $or: [{ email: req.body.emailOrUsername }, { username: req.body.emailOrUsername }]
        }).exec();

        if (user) {
            if (user.password === req.body.password) {

                const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '1h' });

                return res.json({ message: 'Login successful', token, data: user });
            }
            else {
                res.status(400).send("Password incorrect")
            }
        }
        else {
            res.status(400).send("User not found")
        }
    } catch (err) {
        console.error('Error getting user:', err);
    }
};