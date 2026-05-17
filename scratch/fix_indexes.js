const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studio_photography');
        console.log('Connected to MongoDB');

        const collections = await mongoose.connection.db.listCollections().toArray();
        const servicesExists = collections.some(c => c.name === 'services');

        if (servicesExists) {
            console.log('Dropping old index name_1 from services...');
            try {
                await mongoose.connection.db.collection('services').dropIndex('name_1');
                console.log('Successfully dropped name_1 index');
            } catch (err) {
                console.log('Index name_1 not found or already dropped');
            }
        }

        console.log('Fix complete. Exiting...');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing indexes:', error);
        process.exit(1);
    }
};

fixIndexes();
