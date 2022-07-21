## import modules

from numpy import NaN, full
from classes import *
from pymongo import MongoClient
from datetime import datetime
import matplotlib.pyplot as plt



ch = CoinHandler()

## example prefs
ex_pref = {
    'risk_appetite': 'low',
    'term': 'long',
    'capital': 100,
    'sens': []
}

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('mongodb://localhost:27017/')
filter={}
sort=list({
    'createdAt': 1, 
    '_id': 1
}.items())

db = client['bloomfi']['tickers'].find(
  filter=filter,
  sort=sort
)

prices = {}

for entry in db:
    if entry['trustScore'] != 'green' or entry['isAnomaly']:
        continue
    coin_id = entry['market']['identifier']
    new_date = entry['createdAt'].date()

    if not coin_id in prices:
        prices[coin_id] = {new_date: entry['last']}
        ch.coins[coin_id] = DefiCoin(coin_id, entry['market']['name'], entry['last'] * entry['volume'], new_date)
    else:
        if new_date > ch.coins[coin_id].latest_day:
            prices[coin_id][new_date] = entry['last']
            ch.coins[coin_id].latest_day = new_date


# prices = pad_dict_list(prices, NaN)
full_data = pd.DataFrame.from_dict(prices)
full_data.index.rename('Date', inplace=True)
# print(len(full_data))
full_data.to_markdown('data.txt')

good_data = full_data.iloc[:, 1:20]

p = Portfolio('ABCD', 'one', ex_pref, good_data)

price_graph(good_data)
cumul_returns(good_data)
plt.show()

# print(p.assets)

