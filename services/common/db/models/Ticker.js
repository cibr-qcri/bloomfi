const mongoose = require('mongoose');

const TickerSchema = new mongoose.Schema(
  {
    base: {
      type: String,
      trim: true,
      unique: true,
    },
    target: {
      type: String,
      trim: true,
    },
    market: {
      type: Map,
      of: String,
      trim: true,
    },
    last: {
      type: Number,
      trim: true,
    },
    volume: {
      type: Number,
    },
    convertedLast: {
      type: Map,
      to: Number,
    },
    convertedVolume: {
      type: Map,
      to: Number,
      trim: true,
    },
    trustScore: {
      type: String,
    },
    bidAskSpreadPercentage: {
      type: Number,
    },
    lastTradedAt: {
      type: String,
    },
    lastFetchAt: {
      type: String,
    },
    isAnomaly: {
      type: Boolean,
    },
    isStale: {
      type: Boolean,
    },
    coinId: {
      type: String,
    },
    targetCoinId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticker', TickerSchema);
