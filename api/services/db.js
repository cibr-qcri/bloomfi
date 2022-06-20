const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Server connected to mongodb on ${process.env.MONGO_URI}`.green);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

module.exports = connectDB;
