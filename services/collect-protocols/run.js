const CoinGecko = require('coingecko-api');
const connectDB = require('../common/db/connect');
const Protocol = require('../common/db/models/Protocol');
const DataProvider = require('../common/db/models/DataProvider');
const { sleep } = require('../common/utils');

const getData = async () => {
  console.log('Testing API connection...');
  const CoinGeckoClient = new CoinGecko();
  const apiConnection = await CoinGeckoClient.ping();
  let protocols = [];

  if (apiConnection.success) {
    console.log('Getting data providers from the database...');
    let dataProviders = [];

    try {
      if (process.env.NODE_ENV == 'development') {
        dataProviders = await DataProvider.find({}).limit(50);
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
          console.log(`Fetching token data for ${provider.protocolName}`);
          let protocol = await CoinGeckoClient.coins.fetch(
            provider.coinGeckoId
          );
          protocols.push(protocol);

          await sleep(process.env.REQUEST_DELAY_MS);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } else {
    console.log('Connection to API failed. Please try again.');
  }

  return protocols;
};

const storeData = async (data) => {
  let protocols = [];
  console.log('Storing data to the database...');
  data.forEach(async (obj) => {
    let protocol = {
      id: obj.data.id,
      symbol: obj.data.symbol,
      name: obj.data.name,
      assetPlatformId: obj.data.asset_platform_id,
      platforms: obj.data.platforms,
      categories: obj.data.categories,
      description: obj.data.description?.en,
      genesisDate: obj.data.genesis_date,
      contractAddress: obj.data.contract_address,
    };

    protocols.push(protocol);
  });

  for (let protocol of protocols) {
    const documentExists = await Protocol.findOne({
      name: protocol.name,
    });

    if (!documentExists) {
      await Protocol.create(protocol);
    } else {
      await Protocol.updateOne({ name: protocol.name }, protocol);
    }
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
    await connectDB();

    while (true) {
      const data = await getData(process.env.API_URL);
      await storeData(data);
      await wait(process.env.SERVICE_DELAY_MS);
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
