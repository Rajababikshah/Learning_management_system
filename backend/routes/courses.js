import express from 'express';
const router = express.Router();
import auth from '../middleware/auth';
import upload from '../middleware/upload';
import cloudinary from '../utils/cloudinary';
import Course from '../models/Course';
import streamifier from 'streamifier';
import User from '../models/User';

// Tutor uploads a course/note (file)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    // only tutors
    const user = await User.findById(req.user.id);
    if (user.role !== 'tutor') return res.status(403).json({ msg: 'Only tutors can upload' });

    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    // upload buffer to cloudinary
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'lms_files' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      fileUrl: result.secure_url,
      filePublicId: result.public_id,
      uploadedBy: req.user.id
    });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all courses (students can see)
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find().populate('uploadedBy', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// example endpoints (replace with real logic)
router.get('/', (req, res) => {
  res.json({ message: 'Courses list (stub)' });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create course (stub)', data: req.body });
});

export default router;
