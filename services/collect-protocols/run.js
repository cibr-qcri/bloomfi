// External
const CoinGecko = require('coingecko-api');

// Models
const Protocol = require('../common/db/models/Protocol');
const DataProvider = require('../common/db/models/DataProvider');
const Ticker = require('../common/db/models/Ticker');
const Market = require('../common/db/models/Market');
const Metric = require('../common/db/models/Metric');

// Utils
const connectDB = require('../common/db/connect');
const { sleep } = require('../common/utils');

const storeMetricsData = async (obj, doc) => {
  let metricDataProtocol = {
    protocol: doc._id,
    sentimentVotesUpPercentage: obj.data.sentiment_votes_up_percentage,
    sentimentVotesDownPercentage: obj.data.sentiment_votes_up_percentage,
    marketCapRank: obj.data.market_cap_rank,
    moingeckoRank: obj.data.coingecko_rank,
    coingeckoScore: obj.data.coingecko_score,
    developerScore: obj.data.developer_score,
    pcommunityScore: obj.data.community_score,
    liquidityScore: obj.data.liquidity_score,
    publicInterestScore: obj.data.public_interest_score,
    communityData: obj.data.community_data,
    developerData: obj.data.developer_data,
    publicInterestStats: obj.data.public_interest_stats,
  };

  await Metric.create(metricDataProtocol);
};

const storeMarketData = async (obj, doc) => {
  let marketData = {
    protocol: doc._id,
    currentPrice: obj.data.market_data.current_price.usd,
    ptotalValueLocked: obj.data.market_data.total_value_locked,
    mcapToTvlRatio: obj.data.market_data.mcap_to_tvl_ratio,
    fdvToTvlRatio: obj.data.market_data.fdv_to_tvl_ratio,
    ath: obj.data.market_data.ath.usd,
    athChangePercentage: obj.data.market_data.ath_change_percentage.usd,
    athDate: obj.data.market_data.ath_date.usd,
    atl: obj.data.market_data.atl.usd,
    atlChangePercentage: obj.data.market_data.atl_change_percentage.usd,
    atlDate: obj.data.market_data.atl_date.usd,
    marketCap: obj.data.market_data.market_cap.usd,
    fullyDilutedValuation: obj.data.market_data.fully_diluted_valuation.usd,
    totalVolume: obj.data.market_data.total_volume.usd,
    totalSupply: obj.data.market_data.total_supply,
    maxSupply: obj.data.market_data.max_supply,
    circulatingSupply: obj.data.market_data.circulating_supply,
    lastUpdated: obj.data.market_data.last_updated,
  };

  await Market.create(marketData);
};

const storeTickerData = async (obj, doc) => {
  let tickers = [];
  const targets = ['USD', 'USDT', 'USDC', 'BUSD'];
  let tickers_protocol = obj.data.tickers;
  for (let ticker_protocol of tickers_protocol) {
    if (targets.indexOf(ticker_protocol.target) != -1) {
      let ticker = {
        protocol: doc._id,
        base: ticker_protocol.base,
        target: ticker_protocol.target,
        market: ticker_protocol.market,
        last: ticker_protocol.last,
        volume: ticker_protocol.volume,
        convertedLast: ticker_protocol.converted_last,
        convertedVolume: ticker_protocol.convert_volume,
        trustScore: ticker_protocol.trust_score,
        bidAskSpreadPercentage: ticker_protocol.bid_ask_apread_percentage,
        lastTradedAt: ticker_protocol.last_traded_at,
        isAnomaly: ticker_protocol.is_anomaly,
        isStale: ticker_protocol.is_stale,
      };

      tickers.push(ticker);
    }
  }

  for (let ticker of tickers) {
    const documentExists = await Ticker.findOne({
      base: ticker.base,
    });

    if (!documentExists) {
      await Ticker.create(ticker);
    } else {
      await Ticker.updateOne({ base: ticker.base }, ticker);
    }
  }
};

const storeProtocolData = async (obj) => {
  console.log('Storing protocol data to the database...');
  let protocol = {
    id: obj.data.id,
    symbol: obj.data.symbol,
    name: obj.data.name,
    assetPlatformId: obj.data.asset_platform_id,
    genesisDate: obj.data.genesis_date,
    platforms: obj.data.platforms,
    categories: obj.data.categories,
    description: obj.data.description?.en,
    genesisDate: obj.data.genesis_date,
    contractAddress: obj.data.contract_address,
  };

  const documentExists = await Protocol.findOne({
    name: protocol.name,
  });

  if (!documentExists) {
    return await Protocol.create(protocol);
  } else {
    return await Protocol.findOneAndUpdate({ name: protocol.name }, protocol);
  }
};

const fetchAndStoreProtocols = async () => {
  console.log('Testing API connection...');
  const CoinGeckoClient = new CoinGecko();
  const apiConnection = await CoinGeckoClient.ping();

  let protocol = null;
  if (apiConnection.success) {
    let dataProviders = [];

    try {
      if (process.env.NODE_ENV == 'development') {
        dataProviders = await DataProvider.find({}).limit(10);
        console.log(`Retrived ${dataProviders.length} documents.`);
      } else {
        dataProviders = await DataProvider.find({});
        console.log(`Retrived ${dataProviders.length} documents.`);
      }
    } catch (error) {
      console.log(error);
    }

    for (let provider of dataProviders) {
      if (provider.coinGeckoId) {
        try {
          console.log(`Fetching protocol data for ${provider.protocolName}`);
          fetchedProtocol = await CoinGeckoClient.coins.fetch(
            provider.coinGeckoId
          );
          const storedProtocol = await storeProtocolData(fetchedProtocol);
          await storeMarketData(fetchedProtocol, storedProtocol);
          await storeMetricsData(fetchedProtocol, storedProtocol);
          await storeTickerData(fetchedProtocol, storedProtocol);
          await sleep(process.env.REQUEST_DELAY_MS);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } else {
    console.log('Connection to API failed. Please try again.');
  }
};

const wait = async (delayMs) => {
  delayMs = parseInt(delayMs);
  const currentTime = new Date();
  console.log(`Process completed on ${currentTime.toLocaleString()}`);

  const nextRunTime = new Date(currentTime.getTime() + delayMs);
  console.log(`Next run will be on ${nextRunTime.toLocaleString()}\n`);

  await sleep(delayMs);
};

const main = async () => {
  try {
    console.log('Waiting for bootstrap service to finish...');
    await sleep(process.env.STARTUP_DELAY_MS);
    await connectDB();

    while (true) {
      await fetchAndStoreProtocols();
      await wait(process.env.INTERVAL_DELAY_MS);
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
