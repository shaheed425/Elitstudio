const express = require('express');
const router = express.Router();
const { getTestimonials, addTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

router.get('/', getTestimonials);
router.post('/', protect, upload.single('image'), addTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
