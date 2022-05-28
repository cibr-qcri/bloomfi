const axios = require('axios');
const connectDB = require('../common/db/connect');
const Protocol = require('../common/db/models/Protocol');
const { sleep } = require('../common/utils');

const getData = async (URL) => {
  console.log('Fetching protocol data from API...');
  const response = await axios.get(URL);

  return response.data;
};

const storeData = async (data) => {
  console.log('Writing data to the database...');
  data.forEach(async (obj) => {
    const protocol = {
      name: obj.name,
      contractAddress: obj.address,
      symbol: obj.symbol,
      websiteUrl: obj.url,
      description: obj.description,
      mainChain: obj.chain,
      geckoId: obj.gecko_id,
      coinMarketCapId: obj.cmcId,
      category: obj.category,
      chains: obj.chains,
      tvl: obj.tvl,
      chainTvls: obj.chainTvls,
      marketCap: obj.mcap,
      fullyDilutedVolume: obj.fdv,
    };

    // Check if the document exists in DB
    const documentExists = await Protocol.findOne({ name: protocol.name });

    if (!documentExists) {
      // Write to DB
      await Protocol.create(protocol);
    }
  });
};

const main = async () => {
  const API_URL = 'https://api.llama.fi/protocols';

  try {
    console.log('Connecting to the database...');
    await connectDB();

    // Keep running
    while (true) {
      const data = await getData(API_URL);

      await storeData(data);

      const currentTime = new Date();
      const nextRunTime = new Date(
        // Every 7 days
        currentTime.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      console.log(`Process completed on ${currentTime.toLocaleString()}`);
      console.log(`Next run will be on ${nextRunTime.toLocaleString()}\n`);

      // Sleep until next run time comes
      await sleep(nextRunTime.getTime() - currentTime);
    }
  } catch (error) {
    console.log(error);
    console.log('Halting due to an error...');
  }
};

main();
