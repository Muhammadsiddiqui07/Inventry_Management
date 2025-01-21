import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    first_name: {
        type: Schema.Types.String,
        required: true
    },
    last_name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    profile_url: {
        type: Schema.Types.String,
        required: true,
    },
},
    {
        timestamps: true

    })

const user = mongoose.model('user', userSchema);

export default user

