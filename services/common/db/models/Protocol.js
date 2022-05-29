const mongoose = require('mongoose');

const ProtocolDataProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please provide a protocol name'],
    },
    symbol: {
      type: String,
      required: [true, 'Please provide a protocol symbol'],
    },
    coinGeckoId: {
      type: String,
    },
    coinMarketCapId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'ProtocolDataProvider',
  ProtocolDataProviderSchema
);
