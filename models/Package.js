const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a package name'],
    },
    price: {
        type: String,
        required: [true, 'Please add a price'],
    },
    features: [String],
    isPopular: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Package', PackageSchema);
