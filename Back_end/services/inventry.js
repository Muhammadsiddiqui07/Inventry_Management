import express from 'express';
import Inventory from '../modal/inventry.js';
import Joi from 'joi';

const router = express.Router();

// Joi Schema for Inventory validation
const inventorySchema = Joi.object({
    item_name: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()
});

// Add Inventory Item
router.post('/add', async (req, res) => {
    try {
        await inventorySchema.validateAsync(req.body);
        const { item_name, category, quantity, price } = req.body;

        const newItem = new Inventory({ item_name, category, quantity, price });
        await newItem.save();

        return res.status(201).send({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Get All Inventory Items
router.get('/get_all', async (req, res) => {
    try {
        const items = await Inventory.find();
        return res.status(200).send({ message: 'Inventory items fetched successfully', items });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

// Update Inventory Item
router.put('/update', async (req, res) => {
    try {
        const { _id, item_name, category, quantity, price } = req.body;

        if (!_id) {
            return res.status(400).send({ message: 'Item ID is required' });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(
            _id,
            { item_name, category, quantity, price },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }

        return res.status(200).send({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

// Delete Inventory Item
router.delete('/delete', async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send({ message: 'Item ID is required' });
        }

        const deletedItem = await Inventory.findByIdAndDelete(_id);

        if (!deletedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }

        return res.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;
