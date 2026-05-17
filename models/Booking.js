const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    date: {
        type: Date,
        required: [true, 'Please add a date'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    serviceType: {
        type: String,
        required: [true, 'Please add a service type'],
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Booking', BookingSchema);
