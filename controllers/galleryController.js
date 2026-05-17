const Gallery = require('../models/Gallery');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        const gallery = await Gallery.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: gallery.length, data: gallery });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add new image to gallery
// @route   POST /api/gallery
// @access  Private/Admin
const addImage = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image file.' });
        }

        const { title, category } = req.body;
        
        if (!title || !category) {
            return res.status(400).json({ success: false, message: 'Title and Category are required fields.' });
        }

        const galleryItem = await Gallery.create({
            title,
            category,
            imageUrl: req.file.path || req.file.secure_url || req.file.url,
        });

        res.status(201).json({ success: true, data: galleryItem });
    } catch (error) {
        console.error('Gallery Add Error:', error);
        res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteImage = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);

        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Optional: Delete from Cloudinary as well
        // const publicId = galleryItem.imageUrl.split('/').pop().split('.')[0];
        // await cloudinary.uploader.destroy(`studio_photography/${publicId}`);

        await galleryItem.deleteOne();

        res.json({ success: true, message: 'Image removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get gallery image by slug
// @route   GET /api/gallery/slug/:slug
// @access  Public
const getGalleryBySlug = async (req, res) => {
    try {
        const galleryItem = await Gallery.findOne({ slug: req.params.slug });
        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        res.json({ success: true, data: galleryItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getGallery, addImage, deleteImage, getGalleryBySlug };
