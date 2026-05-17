const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const username = 'admin';
    const password = 'admin123';

    let admin = await Admin.findOne({ username });

    if (admin) {
      admin.password = password;
      await admin.save();
      console.log(`Admin password updated for user: ${username}`);
    } else {
      admin = await Admin.create({ username, password });
      console.log(`New admin created: ${username}`);
    }

    console.log('Credentials:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    process.exit();
  } catch (err) {
    console.error('Error resetting admin:', err.message);
    process.exit(1);
  }
};

resetAdmin();
