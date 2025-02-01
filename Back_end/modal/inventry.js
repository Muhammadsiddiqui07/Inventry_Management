import mongoose from "mongoose";

const { Schema } = mongoose;

const inventorySchema = new Schema({
    name: {  // Changed from 'item_name' to 'name' for consistency
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
