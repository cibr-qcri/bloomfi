// External
const { TwitterApi } = require('twitter-api-v2');

// Models
const DataProvider = require('../common/db/models/DataProvider');
const Tweet = require('../common/db/models/Tweet');

// Commons
const connectDB = require('../common/db/connect');
const { sleep } = require('../common/utils');

/**
 * Gets and stores recent tweets for each proctols in the DB
 * @param {TwitterApi} client
 */
const getAndStoreData = async (client) => {
  console.log('Getting and storing tweets for each protocol...');
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
  const dataProviders = await DataProvider.find({});
  for (let dataProvider of dataProviders) {
    console.log(`Gettings recent tweets for ${dataProvider.protocolName}`);

    const latestTweet = await Tweet.find({
      dataProvider: dataProvider._id,
      publishedAt: { $gt: new Date() },
    })
      .sort({ publishedAt: -1 })
      .limit(1);

    let numOfTweets = 0;
    const paginator = await client.v2.search(dataProvider.protocolSymbol, {
      max_results: process.env.MAX_RESULTS,
      'media.fields': 'url',
      since_id: latestTweet.length > 0 ? latestTweet[0].id : undefined,
      'tweet.fields': tweetFields.join(','),
    });
    while (!paginator.done) {
      for (let tweet of paginator.tweets) {
        const doc = {
          dataProvider: dataProvider._id,
          id: tweet.id,
          authorId: tweet.author_id,
          publishedAt: tweet.created_at,
          lang: tweet.lang,
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
        await Tweet.create(doc);
        numOfTweets++;
      }
      await sleep(process.env.REQUEST_DELAY_MS);
      await paginator.fetchNext();
    }
    console.log(
      `Stored ${numOfTweets} tweets for ${dataProvider.protocolName}`
    );
  }
};

const main = async () => {
  if (!process.env.BEARER_KEY) {
    console.log('Twitter bearer key is not provided');
    return;
  }

  console.log('Waiting for bootstrap service to finish...');
  await sleep(process.env.STARTUP_DELAY_MS);

  try {
    await connectDB();
    const client = new TwitterApi(process.env.BEARER_KEY);
    while (true) {
      await getAndStoreData(client);
      await sleep(process.env.INTERVAL_DELAY_MS);
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
