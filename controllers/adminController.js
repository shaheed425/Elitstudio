const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username }).select('+password');

        if (admin && (await admin.matchPassword(password))) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.json({
                success: true,
                token,
                admin: {
                    id: admin._id,
                    username: admin.username,
                },
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Register admin (one-time or via existing admin)
// @route   POST /api/admin/register
// @access  Public (Should be protected or disabled in production)
const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        const admin = await Admin.create({
            username,
            password,
        });

        if (admin) {
            res.status(201).json({
                success: true,
                message: 'Admin registered successfully',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { loginAdmin, registerAdmin };
