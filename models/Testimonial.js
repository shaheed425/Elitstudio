const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Please add a client name'],
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5,
    },
    imageUrl: {
        type: String,
    },
    clientTitle: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
