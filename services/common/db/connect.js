const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Connecting to the database...');
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`Server connected to mongodb on ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
