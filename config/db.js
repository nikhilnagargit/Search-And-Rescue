const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    // exit process with faliure
    process.exit(1);
  }
};

module.exports = connectDB;
