import mongoose from "mongoose";

const { Schema } = mongoose;

const inventorySchema = new Schema({
    item_name: {
        type: Schema.Types.String,
        required: true
    },
    category: {
        type: Schema.Types.String,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
