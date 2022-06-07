const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema(
  {
    protocol: {
      ref: 'Protocol',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sentimentVotesUpPercentage: {
      type: Number,
    },
    sentimentVotesDownPercentage: {
      type: Number,
    },
    marketCapRank: {
      type: Number,
    },
    coingeckoRank: {
      type: Number,
    },
    coingeckoScore: {
      type: Number,
    },
    developerScore: {
      type: Number,
    },
    communityScore: {
      type: Number,
    },
    liquidityScore: {
      type: Number,
    },
    publicInterestScore: {
      type: Number,
    },
    communityData: {
      type: Map,
      to: Number,
    },
    developerData: {
      type: Map,
      to: Number,
    },
    publicInterestStats: {
      type: Map,
      to: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Metric', MetricSchema);
