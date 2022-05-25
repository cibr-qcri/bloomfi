const mongoose = require('mongoose');

const ProtocolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please provide a protocol name'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Protocol', ProtocolSchema);
