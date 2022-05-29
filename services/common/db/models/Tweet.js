const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
  {
    protocol: {
      ref: 'Protocol',
      type: mongoose.Schema.Types.ObjectId,
    },
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tweet', TweetSchema);
