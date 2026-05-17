const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123'
      });
      console.log('Default admin created: admin / admin123');
    } else {
      console.log('Admin already exists');
    }
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
