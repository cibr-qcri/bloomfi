const mongoose = require('mongoose');

const ProtocolSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please provide a protocol id'],
    },
    symbol: {
      type: String,
      trim: true,
      required: [true, 'Please provide a protocol symbol'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a protocol name'],
    },
    assetPlatformId: {
      type: String,
      trim: true,
    },
    platforms: {
      type: Map,
      of: String,
    },
    categories: {
      type: [String],
    },
    description: {
      type: String,
      trim: true,
    },
    genesisDate: {
      type: Date,
    },
    contractAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Protocol', ProtocolSchema);
