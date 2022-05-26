const mongoose = require('mongoose');

const ProtocolSchema = new mongoose.Schema(
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
    contractAddress: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    mainChain: {
      type: String,
      trim: true,
    },
    geckoId: {
      type: String,
    },
    coinMarketCapId: {
      type: String,
    },
    category: {
      type: String,
    },
    chains: {
      type: [String],
    },
    auditLinks: {
      type: [String],
    },
    tvl: {
      type: Number,
    },
    chainTvls: {
      type: Map,
      of: String,
    },
    marketCap: {
      type: Number,
    },
    fullyDilutedVolume: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

ProtocolSchema.pre('save', function (next) {
  Object.keys(this._doc).map((key) => {
    if (this._doc[key] === '-') {
      this._doc[key] = null;
    }
  });

  next();
});

module.exports = mongoose.model('Protocol', ProtocolSchema);
