import express from 'express'
import users from '../services/user.js'
import upload from '../services/upload.js'


const router = express.Router()

router.use('/', users)
router.use('/upload', upload)


export default router