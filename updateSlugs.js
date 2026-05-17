const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Gallery = require('./models/Gallery');

dotenv.config();

const updateSlugs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for slug update...');

        const services = await Service.find();
        for (let service of services) {
            if (!service.slug) {
                const slug = service.title
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                await Service.updateOne({ _id: service._id }, { $set: { slug, category: service.category || 'General' } });
                console.log(`Updated Service: ${service.title} -> ${slug}`);
            }
        }

        const galleryItems = await Gallery.find();
        for (let item of galleryItems) {
            if (!item.slug) {
                const slug = item.title
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                await Gallery.updateOne({ _id: item._id }, { $set: { slug } });
                console.log(`Updated Gallery: ${item.title} -> ${slug}`);
            }
        }

        console.log('All slugs updated successfully.');
        process.exit();
    } catch (err) {
        console.error('Error updating slugs:', err.message);
        process.exit(1);
    }
};

updateSlugs();
