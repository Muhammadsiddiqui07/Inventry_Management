import express from 'express';
import users from '../controller/user.js'
import inventries from '../controller/inventry.js'

const router = express.Router()

router.use('/users', users)
router.use('/inventries', inventries)


export default router;  