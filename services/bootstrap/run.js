const axios = require('axios');
const connectDB = require('../common/db/connect');
const Protocol = require('../common/db/models/Protocol');
const { sleep } = require('../common/utils');

const getData = async (url) => {
  console.log('Fetching protocol data from API...');
  const response = await axios.get(url);
  return response.data;
};

const storeData = async (data) => {
  console.log('Storing data to the database...');
  data.forEach(async (obj) => {
    const protocol = {
      name: obj.name,
      symbol: obj.symbol,
      coinGeckoId: obj.gecko_id,
      coinMarketCapId: obj.cmcId,
    };

    if (protocol.symbol && protocol.symbol !== '-') {
      if (protocol.coinGeckoId || protocol.coinMarketCapId) {
        const documentExists = await Protocol.findOne({ name: protocol.name });
        if (!documentExists) {
          await Protocol.create(protocol);
        } else {
          await Protocol.updateOne({ name: protocol.name }, protocol);
        }
      }
    }
  });
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
      await wait(process.env.DELAY_MS);
    }
  } catch (error) {
    console.log('Service exiting due to an error', error);
  }
};

main();
