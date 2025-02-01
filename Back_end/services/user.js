import express from 'express';
import User from '../modal/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

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
        // Validate request body using Joi schema
        await userSchema.validateAsync(req.body);

        const { firstName, lastName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const phoneNumber = '0'; // Default phone number

        // Create a new user
        const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { _id: newUser._id, email: newUser.email },
            'MS',  // Use process.env.JWT_SECRET if you start using environment variables
            { expiresIn: '1h' }
        );

        // Response without returning password for security reasons
        const userResponse = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token,
        };

        console.log('User registered successfully:', userResponse);

        return res.status(201).json({ success: true, message: 'User registered successfully', user: userResponse });

    } catch (err) {
        console.error('Signup error:', err.message);
        return res.status(400).json({ success: false, message: err.message });
    }
});



router.put('/update_profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        console.log(userId);


        // Validate MongoDB ObjectId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Find the existing user
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { firstName, lastName, email, password } = req.body;

        console.log(req.body);




        // Hash the new password if provided
        let hashedPassword = existingUser.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Log user update details
        console.log('Updating user with ID:', userId);

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                email,
                password: hashedPassword, // Update password only if provided
            },
            { new: true, runValidators: true }
        );

        console.log('Updated user:', updatedUser);

        return res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });

    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});


export default router;
