import express from 'express'
import User from '../modal/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

const router = express.Router()

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(6).required(),
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, "MS");
        delete user.password;
        return res.status(200).send({ message: 'User found', user, token });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
});
router.post('/signup', async (req, res) => {
    try {
        await userSchema.validateAsync(req.body);
        const { firstName, lastname, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { firstName, lastname, email, phone, password: hashedPassword };
        const newUser = new User(userData);
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, "MS");
        const userResponse = {
            _id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            phone: newUser.phone,
            token
        };
        return res.status(200).send({ message: 'User Added Successfully!', user: userResponse });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

router.put('/update_profile', async (req, res) => {
    try {
        const { _id, first_name, last_name, email, phone, profile_url } = req.body;

        if (!_id) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { first_name, last_name, email, phone, profile_url },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'Profile updated successfully', user: updatedUser });

    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});


export default router;