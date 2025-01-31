import express from 'express';
import User from '../modal/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Joi validation schemas
const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
});


router.get('/get_user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(userId).select('firstName lastName email phoneNumber profileImage');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User data retrieved successfully', data: user });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        await loginSchema.validateAsync(req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET || 'MS', { expiresIn: '1h' });
        delete user.password;

        return res.status(200).json({ success: true, message: 'Login successful', user, token });

    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        await userSchema.validateAsync(req.body);
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'MS', { expiresIn: '1h' });

        const userResponse = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token,
        };

        return res.status(201).json({ success: true, message: 'User registered successfully', user: userResponse });

    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});


router.put('/update_profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if userId matches MongoDB ObjectId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Validate the request body against the schema
        await updateProfileSchema.validateAsync(req.body);

        const { firstName, lastName, email, phoneNumber } = req.body;

        // Find the existing user by ID
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Handle profile image upload if available
        let profileImage = existingUser.profileImage;
        if (req.file) {
            profileImage = `http://localhost:4000/images/${req.file.filename}`;
        }

        // Log the userId to ensure it's correct
        console.log('Updating user with ID:', userId);

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, phoneNumber, profileImage },
            { new: true, runValidators: true }
        );

        // Log the updated user
        console.log('Updated user:', updatedUser);

        return res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });

    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});


export default router;
