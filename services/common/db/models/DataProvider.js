const mongoose = require('mongoose');

const DataProviderSchema = new mongoose.Schema(
  {
    protocolName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please provide a protocol name'],
    },
    protocolSymbol: {
      type: String,
      trim: true,
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

module.exports = mongoose.model('DataProvider', DataProviderSchema);
