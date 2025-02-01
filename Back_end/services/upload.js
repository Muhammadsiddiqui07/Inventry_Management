import express from 'express';
import multer from 'multer';
import path from 'path';


const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Store files in 'images/' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const fileUrl = `http://localhost:4000/images/${req.file.filename}`;
        return res.status(200).json({ success: true, message: 'File uploaded successfully', fileUrl });

    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ success: false, message: 'Failed to upload file', error: error.message });
    }
});


export default router;
