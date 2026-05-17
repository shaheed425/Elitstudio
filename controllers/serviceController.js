const Service = require('../models/Service');

const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getActiveServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ createdAt: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addService = async (req, res) => {
    try {
        const { title, description, category, icon, isActive } = req.body;
        
        if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: 'Title, description, and category are required' });
        }

        const serviceData = { 
            title, 
            description, 
            category, 
            icon, 
            isActive: isActive === 'false' ? false : true 
        };
        
        if (req.file) {
            serviceData.imageUrl = req.file.path || req.file.secure_url || req.file.url;
            serviceData.cloudinaryPublicId = req.file.filename || req.file.public_id;
        }

        const service = await Service.create(serviceData);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        console.error('Service Add Error:', error);
        res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        await service.deleteOne();
        res.json({ success: true, message: 'Service removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
const getServiceBySlug = async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getServices, getActiveServices, addService, updateService, deleteService, getServiceBySlug };
