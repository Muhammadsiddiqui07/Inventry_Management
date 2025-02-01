import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_PASSWORD
mongoose.connect(`mongodb+srv://Muhammad_Siddiqui:${MONGO_URI}@ms.odorl.mongodb.net/`)

export default mongoose;
