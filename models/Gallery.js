const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Wedding', 'Portrait', 'Couple', 'Event', 'Product', 'Fashion'],
    },
    slug: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create slug from title before saving
GallerySchema.pre('save', function() {
    if (!this.isModified('title')) {
        return;
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
});

module.exports = mongoose.model('Gallery', GallerySchema);
