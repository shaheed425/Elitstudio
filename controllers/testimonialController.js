const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addTestimonial = async (req, res) => {
    try {
        console.log('Testimonial Body:', req.body);
        console.log('Testimonial File:', req.file);

        const { clientName, comment, rating } = req.body;
        
        if (!clientName || !comment || !rating) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing fields: ${!clientName ? 'clientName ' : ''}${!comment ? 'comment ' : ''}${!rating ? 'rating' : ''}` 
            });
        }

        const testimonialData = { ...req.body };
        if (req.file) {
            testimonialData.imageUrl = req.file.path || req.file.secure_url || req.file.url;
        }
        
        const testimonial = await Testimonial.create(testimonialData);
        res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
        console.error('Testimonial Add Error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
        await testimonial.deleteOne();
        res.json({ success: true, message: 'Testimonial removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getTestimonials, addTestimonial, deleteTestimonial };
