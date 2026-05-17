const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    icon: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    cloudinaryPublicId: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create slug from title before saving
ServiceSchema.pre('save', function() {
    if (!this.isModified('title')) {
        return;
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
});

module.exports = mongoose.model('Service', ServiceSchema);
