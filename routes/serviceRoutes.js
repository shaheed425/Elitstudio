const express = require('express');
const router = express.Router();
const { getServices, getActiveServices, addService, updateService, deleteService, getServiceBySlug } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

router.get('/', getServices);
router.get('/active', getActiveServices);
router.get('/slug/:slug', getServiceBySlug);
router.post('/', protect, upload.single('image'), addService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
