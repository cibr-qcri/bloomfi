import typing as typ
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import copy
import logging

from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.cla import CLA
from pypfopt import objective_functions
from pypfopt import risk_models
from pypfopt import expected_returns
from pypfopt import plotting


## typing
Preferences = typ.Dict
## example prefs
ex_pref = {
    'risk_appetite': 'low',
    'term': 'long',
    'capital': 100,
    'sens': []
}

## price data
full_data = pd.read_csv("/home/gloria/projects/cibr-qcri/defi-robo-advisor/services/portfolio/test_data.csv", index_col="day")
## clean df
index_len = len(full_data.index)
new_index = np.arange(0, index_len, 1)
full_data.index = new_index
full_data.index.rename('Day', inplace=True)

tr_days = 90
price_data = full_data.iloc[:tr_days]


## sector information
sect_map = {
    'dai': 'lending',
    'uniswap': 'POW',
    'frax': 'deriv',
    'aave': 'POW',
    'chainlink': 'deriv',
    'maker': 'deriv'
}


## all the classes needed to create, monitor, and update a portfolio

class DefiCoin:
    def __init__(self, name: str):
        self.name = name
        

class CoinAnalyzer:
    
    def __init__(self):
        pass

    ## get correlation between coins
    def correlation(coins: pd.DataFrame, verbose=False) -> np.ndarray:
        return coins.iloc[1:].corr()

    def mean(self, price: pd.DataFrame):
        return expected_returns.mean_historical_return(price, compounding=True)


    ## plot correlations of coins
    def corr_plot(self, df):
        plt.matshow(df.iloc[1:].corr())

        plt.xticks(range(df.select_dtypes(['number']).shape[1]), df.select_dtypes(['number']).columns, fontsize=14, rotation=45)
        plt.yticks(range(df.select_dtypes(['number']).shape[1]), df.select_dtypes(['number']).columns, fontsize=14)
        cb = plt.colorbar()
        cb.ax.tick_params(labelsize=14)
        plt.title('Correlation Matrix', fontsize=16)

        plt.show()


    def cov_matrix(self, price: pd.DataFrame, prefs: Preferences, exp: bool):
        ## make df of price data
        ## put preferences into data, use security risks, prefs, etc
        if exp:
            r = risk_models.exp_cov(price, span=90, frequency=365)
        else:
            r = risk_models.risk_matrix(price, method='ledoit_wolf')
        num_coins = len(r.columns)
        
        ## generate alt risk matrix, uses prefs and security
        ## each coin should have a risk score from prefs 
        prefs_risk = np.zeros((num_coins, num_coins))

        np.fill_diagonal(prefs_risk, [1.3, 1.2, 1.2, 1.5, 1.3, 1.1])
        prefs_risk = pd.DataFrame(prefs_risk, columns=r.columns)

        # print(prefs_risk)
        # print(prefs_risk.T.to_numpy())

        return (prefs_risk @ r) @ prefs_risk.T.to_numpy()
        


class CoinHandler:

    def __init__(self, n):
        self.coins = []
        self.corrs = np.zeros(n)

    ## get n coins from database
    def get_coins(self):
        ## initialize coins from database
        pass

    ## if daily change is more than 5%
    def check_change(self):
        ## get last two rows of df, use them to calc pct change
        ## if true, call Portfolio.rebalance
        pass


ALL_PORTFOLIOS = {}

class Portfolio:

    def __init__(self, user_id: str, name: str, prefs: Preferences):
        self.user = user_id
        self.name = name
        self.prefs = prefs
        self.created = datetime.date.today()
        self.last_rebal = self.created
        self.assets = {}
        self.cap = self.prefs['capital']
        self.ca = CoinAnalyzer()

        if self.user in ALL_PORTFOLIOS:
            ALL_PORTFOLIOS[self.user].append(self)
        else:
            ALL_PORTFOLIOS[self.user] = [self]

        self.create_portfolio()

    def __str__(self) -> str:
        return f'User {self.user} has this portfolio with {self.assets}'

    def update_prefs(self, new_prefs: Preferences):
        self.prefs.update(new_prefs)
        logging.debug('prefs updated')
        self.create_portfolio()


    ## function that plots effiecient frontier and randomly generated portfolios
    def plot_random_portfolios(self, e: EfficientFrontier):
        fig, ax = plt.subplots()
        ef_max_sharpe = copy.deepcopy(e)
        my_range = np.linspace(0.0, 1.5, 50)
        plotting.plot_efficient_frontier(e, ax=ax, show_assets=False, ef_param_range=my_range)

        # Find the tangency portfolio
        ef_max_sharpe.max_sharpe()
        ret_tangent, std_tangent, _ = ef_max_sharpe.portfolio_performance(verbose=True)
        print(ef_max_sharpe.weights)
        ax.scatter(std_tangent, ret_tangent, marker="*", s=100, c="r", label="Max Sharpe")

        # Generate random portfolios
        n_samples = 10000
        w = np.random.dirichlet(np.ones(e.n_assets), n_samples)
        rets = w.dot(e.expected_returns)
        stds = np.sqrt(np.diag(w @ e.cov_matrix @ w.T))
        sharpes = rets / stds
        ax.scatter(stds, rets, marker=".", c=sharpes, cmap="viridis_r")

        # Output
        ax.set_title("Efficient Frontier with random portfolios")
        ax.legend()
        plt.tight_layout()
        plt.show()


    ## new portfolio. maybe consider sector constraints
    def create_portfolio(self):
        mu = self.ca.mean(price_data)
        S = self.ca.cov_matrix(price_data, self.prefs, True)

        # self.ca.corr_plot(price_data)

        ef = EfficientFrontier(mu, S, solver='ECOS')

        sect_prefs = {}
        for sect in self.prefs['sens']:
            if sect == 'halal':
                sect_prefs['lending'] = 0
            elif sect == 'eco':
                sect_prefs['POW'] = 0

        ef.add_sector_constraints(sect_map, {}, sect_prefs)
        # self.plot_random_portfolios(copy.deepcopy(ef))

        if self.prefs['risk_appetite'] == 'low':
            ef.min_volatility()
            if ef.portfolio_performance()[0] < -0.05:
                print("neg returns")
                ef = EfficientFrontier(mu, S)
                ef.add_sector_constraints(sect_map, {}, sect_prefs)
                try:
                    ef.efficient_risk(.1)
                except:
                    try:
                        ef = EfficientFrontier(mu, S)
                        ef.add_sector_constraints(sect_map, {}, sect_prefs)
                        ef.efficient_risk(.175)
                    except:
                        ef = EfficientFrontier(mu, S)
                        ef.add_sector_constraints(sect_map, {}, sect_prefs)
                        ef.efficient_risk(.25)
        elif self.prefs['risk_appetite'] == 'mid':
            try:
                ef.max_sharpe()
            except:
                ef = EfficientFrontier(mu, S)
                ef.add_sector_constraints(sect_map, {}, sect_prefs)
                ef.max_quadratic_utility()
        else:
            ef.efficient_risk(1.5)

        self.ef = ef
        self.assets = ef.clean_weights()

        self.last_rebal = datetime.date.today()

        # print(f'portfolio rebalanced\n{self.assets}')
        self.ef.portfolio_performance(verbose=True)

    def test_portfolio(self, days):
        final_val = 0

        for coin, weight in self.assets.items():
            final_val += np.round(weight * self.cap / full_data[coin].iloc[tr_days], 2) * full_data[coin].iloc[days + tr_days] 
        print(f'The return of this portfolio after {days} days is ${final_val - self.cap}, which is {np.round(final_val - self.cap, 2) / self.cap * 100}%')

p = Portfolio('ABCD', 'one', ex_pref)
print(p.assets)
p.test_portfolio(5)

p.update_prefs({'risk_appetite': 'mid'})
print(p.assets)
p.test_portfolio(5)

p.update_prefs({'risk_appetite': 'high'})
print(p.assets)
p.test_portfolio(5)
