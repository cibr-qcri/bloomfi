const mongoose = require('mongoose');
const MarketSchema = new mongoose.Schema(
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
    currentPrice: {
      type: Number,
    },
    totalValueLocked: {
      type: Number,
      //required: [true, 'Please provide a protocol  totalValueLocked'],
    },
    mcapToTvlRatio: {
      type: Number,
      //required: [true, 'Please provide a protocol  mcapToTvlRatio'],
    },
    fdvToTvlRatio: {
      type: String,
      //required: [true, 'Please provide a protocol  fdvToTvlRatio'],
    },
    ath: {
      type: Number,
      //required: [true, 'Please provide a protocol  ath'],
    },
    athChangePercentage: {
      type: Number,
      //required: [true, 'Please provide a protocol  athChangePercentage'],
    },
    athDate: {
      type: Object,
      trim: true,
      //required: [true, 'Please provide a protocol  athDate'],
    },
    atl: {
      type: Number,
      //required: [true, 'Please provide a protocol  atl'],
    },
    atlChangePercentage: {
      type: Number,
      //required: [true, 'Please provide a protocol  atlChangePercentage'],
    },
    atlData: {
      type: [Number],
      //required: [true, 'Please provide a protocol  atlChangePercentage'],
    },
    marketCap: {
      type: Number,
      //required: [true, 'Please provide a protocol  marketCap'],
    },
    fullyDilutedValuation: {
      type: Number,
      // required: [true, 'Please provide a protocol  fullyDilutedValuation'],
    },
    totalVolume: {
      type: Object,
    },
    totalSupply: {
      type: Number,
      //required: [true, 'Please provide a protocol  totalSupply'],
    },
    maxSupply: {
      type: Number,
      //required: [true, 'Please provide a protocol  maxSupply'],
    },
    circulatingSupply: {
      type: Number,
      //required: [true, 'Please provide a protocol  circulatingSupply'],
    },
    lastUpdated: {
      type: String,
      trim: true,
      //required: [true, 'Please provide a protocol  lastUpdated'],
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

module.exports = mongoose.model('Market', MarketSchema);
