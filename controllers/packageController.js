const Package = require('../models/Package');

const getPackages = async (req, res) => {
    try {
        const packages = await Package.find().sort({ createdAt: 1 });
        res.json({ success: true, data: packages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addPackage = async (req, res) => {
    try {
        const pkg = await Package.create(req.body);
        res.status(201).json({ success: true, data: pkg });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
        await pkg.deleteOne();
        res.json({ success: true, message: 'Package removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getPackages, addPackage, deletePackage };
