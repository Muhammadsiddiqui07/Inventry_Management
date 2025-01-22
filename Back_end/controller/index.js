import express from 'express'
import VerifyToken from '../middleware/index.js'
import users from '../services/user.js'
import Inventory from '../services/inventry.js';


const router = express.Router()

router.use('/user', VerifyToken, users)
router.use('/inventry', VerifyToken, Inventory)



export default router