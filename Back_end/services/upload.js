import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// 🔹 Secure Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // 🔹 Upload file to Cloudinary
        cloudinary.uploader.upload_stream({ folder: 'uploads/' }, (error, uploadResult) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ success: false, message: 'Cloudinary upload failed', error: error.message });
            }

            res.status(200).json({ success: true, message: 'File uploaded successfully', fileUrl: uploadResult.secure_url });
        }).end(req.file.buffer);

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Failed to upload file', error: error.message });
    }
});

export default router;
