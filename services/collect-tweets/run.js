// External
const axios = require('axios').default;
const { TwitterApi } = require('twitter-api-v2');

// Models
const DataProvider = require('../common/db/models/DataProvider');
const Tweet = require('../common/db/models/Tweet');

// Commons
const connectDB = require('../common/db/connect');
const { sleep } = require('../common/utils');

const getSentiment = async (text) => {
  try {
    const response = await axios.get(process.env.SENTIMENT_URI, {
      params: { text },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Creartes a new MongoDB document for the given data provider and tweet.
 * @param {string} dataProviderId The data provider ID
 * @param {import('twitter-api-v2').TweetV2} tweet The tweet object
 * @returns
 */
const createDocument = async (dataProviderId, tweet) => {
  const sentiment = await getSentiment(tweet.text);

  const doc = {
    sentiment,
    dataProvider: dataProviderId,
    id: tweet.id,
    authorId: tweet.author_id,
    publishedAt: tweet.created_at,
    text: tweet.text,
    source: tweet.source,
    possiblySensitive: tweet.possibly_sensitive,
    publicMetrics: {
      retweetCount: tweet.public_metrics.retweet_count,
      replyCount: tweet.public_metrics.reply_count,
      likeCount: tweet.public_metrics.like_count,
      quoteCount: tweet.public_metrics.quote_count,
    },
  };

  return await Tweet.create(doc);
};

/**
 * Gets and stores recent tweets for each proctols in the DB
 * @param {TwitterApi} client
 */
const getAndStoreData = async (client) => {
  console.log('Getting and storing tweets for each protocol...');

  const tweetExpansions = ['referenced_tweets.id'];
  const tweetFields = [
    'author_id',
    'created_at',
    'id',
    'lang',
    'public_metrics',
    'possibly_sensitive',
    'source',
    'text',
  ];

  let requestDelayMs = parseInt(process.env.REQUEST_DELAY_MS);
  if (process.env.NODE_ENV === 'development') {
    requestDelayMs *= 10;
  }

  const dataProviders = await DataProvider.find({});
  for (let dataProvider of dataProviders) {
    console.log(`Gettings recent tweets for ${dataProvider.protocolName}`);

    const latestTweet = await Tweet.find({
      dataProvider: dataProvider._id,
      publishedAt: { $gt: new Date() },
    })
      .sort({ publishedAt: -1 })
      .limit(1);

    let paginator = await client.v2.search(dataProvider.protocolSymbol, {
      max_results: process.env.MAX_RESULTS,
      expansions: tweetExpansions.join(','),
      'media.fields': 'url',
      since_id: latestTweet.length > 0 ? latestTweet[0].id : undefined,
      'tweet.fields': tweetFields.join(','),
    });

    let numOfTweets = 0;
    while (numOfTweets <= process.env.TWEETS_PER_PROTOCOL || !paginator.done) {
      for (let tweet of paginator.tweets) {
        if (tweet.lang && tweet.lang !== 'en') {
          continue;
        }

        if (tweet.referenced_tweets?.length > 0) {
          for (let refTweet of tweet.referenced_tweets) {
            if (refTweet.type === 'retweeted') {
              tweet.text = paginator.includes.retweet(tweet).text;
            }
          }
        }

        if (
          tweet.text.includes(`$${dataProvider.protocolSymbol}`) ||
          tweet.text.includes(`#${dataProvider.protocolSymbol}`)
        ) {
          await createDocument(dataProvider._id, tweet);
          numOfTweets++;
        }
      }

      await sleep(requestDelayMs);
      paginator = await paginator.next();
    }

    console.log(`Stored ${numOfTweets} tweets for ${dataProvider.protocolName}`);
  }
};

const main = async () => {
  if (!process.env.TWITTER_BEARER_KEY) {
    console.log('Twitter bearer key is not provided');
    return;
  }

  console.log('Waiting for bootstrap and analyze-sentiment services to run...');
  await sleep(process.env.STARTUP_DELAY_MS);

  try {
    await connectDB();
    const client = new TwitterApi(process.env.TWITTER_BEARER_KEY);
    while (true) {
      await getAndStoreData(client);
      await sleep(process.env.INTERVAL_DELAY_MS);
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
