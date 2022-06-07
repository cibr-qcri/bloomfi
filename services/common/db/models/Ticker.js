const mongoose = require('mongoose');

const TickerSchema = new mongoose.Schema(
  {
    protocol: {
      type: 'Protocol',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    base: {
      type: String,
      trim: true,
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
    isAnomaly: {
      type: Boolean,
    },
    isStale: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticker', TickerSchema);
