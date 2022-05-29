const axios = require('axios');
const connectDB = require('../common/db/connect');
const DataProvider = require('../common/db/models/DataProvider');
const { sleep } = require('../common/utils');

const getData = async (url) => {
  console.log('Fetching data providers from API...');
  const response = await axios.get(url);
  return response.data;
};

const storeData = async (data) => {
  console.log('Storing data to the database...');
  data.forEach(async (obj) => {
    const dataProvider = {
      protocolName: obj.name,
      protocolSymbol: obj.symbol,
      coinGeckoId: obj.gecko_id,
      coinMarketCapId: obj.cmcId,
    };

    if (dataProvider.protocolSymbol && dataProvider.protocolSymbol !== '-') {
      if (dataProvider.coinGeckoId || dataProvider.coinMarketCapId) {
        const documentExists = await DataProvider.findOne({
          protocolName: dataProvider.protocolName,
        });
        if (!documentExists) {
          await DataProvider.create(dataProvider);
        } else {
          await DataProvider.updateOne(
            { protocolName: dataProvider.protocolName },
            dataProvider
          );
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
