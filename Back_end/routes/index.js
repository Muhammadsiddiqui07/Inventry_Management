import express from 'express';
import next from '../controller/index.js'

const router = express.Router()

router.use('/user', next)
router.use('/inventry', next)


export default router;  