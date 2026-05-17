const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = req.body.status || booking.status;
        await booking.save();

        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getBookings, updateBookingStatus };
