import express from 'express'
import VerifyToken from '../middleware/index.js'
import Inventory from '../services/inventry.js';


const router = express.Router()

router.use('/', VerifyToken, Inventory)



export default router