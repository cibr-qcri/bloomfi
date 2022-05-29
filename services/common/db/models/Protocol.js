const mongoose = require('mongoose');

const ProtocolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please provide a protocol name'],
    },
    symbol: {
      type: String,
      trim: true,
      required: [true, 'Please provide a protocol symbol'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Protocol',
  ProtocolSchema
);
