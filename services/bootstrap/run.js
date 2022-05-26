const axios = require('axios');
const connectDB = require('../common/db/connect');
const Protocol = require('../common/db/models/Protocol');

const main = async () => {
  const API_URL = 'https://api.llama.fi/protocols';

  try {
    console.log('Connecting to the DB...');
    await connectDB();

    console.log('Checking if protocols exist...');
    const documentsCount = await Protocol.estimatedDocumentCount();

    if (documentsCount !== 0) {
      console.log('Database is populated. Exiting now...');
      return;
    }

    console.log('Fetching protocol data from API...');
    const response = await axios.get(API_URL);

    // Get json data from HTTP response
    const jsonData = response.data;

    console.log('Writing data to the DB...');
    jsonData.forEach(async (obj) => {
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

      // Write to database
      await Protocol.create(protocol);
    });

    console.log('Process Completed!');
  } catch (error) {
    console.log(error);
  }
};

main();
