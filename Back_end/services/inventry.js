import express from 'express';
import Inventory from '../modal/inventry.js';
import Joi from 'joi';

const router = express.Router();

const inventorySchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
});

router.post('/add', async (req, res) => {
    try {
        // Validate request body
        await inventorySchema.validateAsync(req.body);
        const { name, category, quantity, price } = req.body;

        const newItem = new Inventory({ name, category, quantity, price });
        await newItem.save();

        return res.status(201).json({ success: true, message: 'Item added successfully', item: newItem });
    } catch (error) {
        console.error('Error adding item:', error);
        return res.status(400).json({ success: false, message: error.details ? error.details[0].message : error.message });
    }
});

// ✅ Get All Inventory Items
router.get('/get_all', async (req, res) => {
    try {
        const items = await Inventory.find();
        return res.status(200).json({ success: true, message: 'Inventory items fetched successfully', items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});

// ✅ Update Inventory Item (Uses `:id` in URL)
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Updating item ID:', id);

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Item ID' });
        }

        await inventorySchema.validateAsync(req.body);

        const { name, category, quantity, price } = req.body;

        const updatedItem = await Inventory.findByIdAndUpdate(
            id,
            { name, category, quantity, price },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        return res.status(200).json({ success: true, message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});

// ✅ Delete Inventory Item (Uses `:id` in URL)
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting item ID:', id);

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Item ID' });
        }

        const deletedItem = await Inventory.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        return res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});

export default router;
