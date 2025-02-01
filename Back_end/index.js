import express from 'express'
import router from './routes/index.js'
import mongoose from './db/index.js'
import cors from 'cors'
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables
const app = express()
const port = process.env.PORT;
app.use(express.json())
app.use(cors())

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('db connected!');
})


app.use('/api', router)


app.listen(port, () => {
    console.log(`server is running in port ${port}`);

})