import express from 'express';
import users from '../constant/user.js'
import Inventory from '../constant/inventry.js';

const router = express.Router()

router.use('/user', users)
router.use('/inventry', Inventory)


export default router;  