const mongoose = require('mongoose');

const publicMetricSchema = new mongoose.Schema(
  {
    retweetCount: {
      type: Number,
      required: true,
    },
    replyCount: {
      type: Number,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
    quoteCount: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const sentimentSchema = new mongoose.Schema(
  {
    positive: {
      type: Number,
      required: true,
    },
    negative: {
      type: Number,
      required: true,
    },
    neutral: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const TweetSchema = new mongoose.Schema(
  {
    dataProvider: {
      ref: 'DataProvider',
      type: mongoose.Schema.Types.ObjectId,
    },
    authorId: {
      type: String,
      required: [true, 'Please provide an author id'],
    },
    publishedAt: {
      type: Date,
      required: [true, 'Please provide a data'],
    },
    id: {
      type: String,
      required: [true, 'Please provide an id'],
    },
    publicMetrics: {
      type: publicMetricSchema,
      required: [true, 'Please provide public metrics'],
    },
    possiblySensitive: {
      type: Boolean,
      required: [true, 'Please provide a possibly sensitive flag'],
    },
    source: {
      type: String,
      required: [true, 'Please provide a source'],
    },
    text: {
      type: String,
      required: [true, 'Please provide a text'],
    },
    sentiment: {
      type: sentimentSchema,
      required: [true, 'Please provide a sentiment'],
    },
  },
  {
    timestamps: true,
  }
);

TweetSchema.index({ dataProvider: 1, id: 1 }, { unique: true });

module.exports = mongoose.model('Tweet', TweetSchema);
