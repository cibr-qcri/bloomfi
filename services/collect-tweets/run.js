const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');
const connectDB = require('../common/db/connect');
const { sleep } = require('../common/utils');

const Protocol = require('../common/db/models/Protocol');
const Tweet = require('../common/db/models/Tweet');

/**
 * Gets and stores recent tweets for each proctols in the DB
 * @param {TwitterApi} client
 */
const getAndStoreData = async (client) => {
  console.log('Getting and storing tweets for each protocol...');
  const protocols = await Protocol.find({});
  for (let protocol of protocols) {
    console.log(`Gettings recent tweets for ${protocol.name}`);
    let numOfTweets = 0;
    const now = new Date();
    const paginator = await client.v2.search(
      `${protocol.name} OR ${protocol.symbol}`,
      {
        start_time: new Date(now - 15 * 60 * 1000).toISOString(), // see question below
        max_results: process.env.TWITTER_MAX_RESULTS,
        'media.fields': 'url',
        'tweet.fields': 'created_at',
      }
    );
    while (!paginator.done) {
      for (let tweet of paginator.tweets) {
        tweet.protocol = protocol._id;
        tweet.publishedAt = tweet.created_at;
        delete tweet.created_at;
        await Tweet.create(tweet);
        numOfTweets++;
      }
      await sleep(process.env.DELAY_MS);
      await paginator.fetchNext();
    }
    console.log(`Stored ${numOfTweets} for ${protocol.name}`);
  }
};

const main = async () => {
  try {
    await connectDB();
    const client = new TwitterApi(process.env.TWITTER_BEARER_KEY);

    while (true) {
      await getAndStoreData(client);
      break; // what happens after collecting tweets for all protocols?
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
