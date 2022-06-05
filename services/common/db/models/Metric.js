const mongoose = require('mongoose');
const MetricSchema = new mongoose.Schema(
  {
    sentimentVotesUpPercentage: {
      type: Number,
    },
    sentimentVotesDownPercentage: {
      type: Number,
    },
    marketCapRank: {
      type: Number,
      //required: [true, 'Please provide a protocol  marketCapRank'],
    },
    coingeckoRank: {
      type: Number,
      //required: [true, 'Please provide a protocol  coingeckoRank'],
    },
    coingeckoScore: {
      type: Number,
      //required: [true, 'Please provide a protocol  coingeckoScore'],
    },
    developerScore: {
      type: Number,
    },
    communityScore: {
      type: Number,
    },
    liquidityScore: {
      type: Number,
      trim: true,
    },
    publicInterestScore: {
      type: Number,
    },
    communityData: {
      type: Map,
      to: Number,
      //required: [true, 'Please provide a protocol  communityData'],
    },
    developerData: {
      type: Map,
      to: Number,
      //required: [true, 'Please provide a protocol  developerData'],
    },
    publicInterestStats: {
      type: Map,
      to: Number,
      //required: [true, 'Please provide a protocol  publicInterestStats'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Metric', MetricSchema);
