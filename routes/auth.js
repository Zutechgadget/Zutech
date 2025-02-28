const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../model/user');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);  // Use the validate function for login
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }

    // Check if password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    // Send token
    res.send({ token });
});


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router;