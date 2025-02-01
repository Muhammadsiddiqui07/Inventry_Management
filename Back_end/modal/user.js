import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
        type: Schema.Types.String,
        // required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    profileImage: {
        type: Schema.Types.String,
        // required: true,
    },
},
    {
        timestamps: true

    })

const user = mongoose.model('user', userSchema);

export default user

