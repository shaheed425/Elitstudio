const express = require('express');
const router = express.Router();
const { getPackages, addPackage, deletePackage } = require('../controllers/packageController');
const { protect } = require('../middleware/auth');

router.get('/', getPackages);
router.post('/', protect, addPackage);
router.delete('/:id', protect, deletePackage);

module.exports = router;
