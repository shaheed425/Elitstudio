const express = require('express');
const router = express.Router();
const { getGallery, addImage, deleteImage, getGalleryBySlug } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

router.get('/', getGallery);
router.get('/slug/:slug', getGalleryBySlug);
router.post('/', protect, upload.single('image'), addImage);
router.delete('/:id', protect, deleteImage);

module.exports = router;
