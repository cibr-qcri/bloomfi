const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema(
  {
    protocol: {
      ref: 'Protocol',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    totalValueLocked: {
      type: Number,
    },
    mcapToTvlRatio: {
      type: Number,
    },
    ath: {
      type: Number,
    },
    athChangePercentage: {
      type: Number,
    },
    athDate: {
      type: Date,
    },
    atl: {
      type: Number,
    },
    atlDate: {
      type: Date,
    },
    atlChangePercentage: {
      type: Number,
    },
    marketCap: {
      type: Number,
    },
    totalVolume: {
      type: Object,
    },
    totalSupply: {
      type: Number,
    },
    maxSupply: {
      type: Number,
    },
    circulatingSupply: {
      type: Number,
    },
    lastUpdated: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Market', MarketSchema);
