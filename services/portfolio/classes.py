## import modules

import typing as typ
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import copy
import logging

from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.cla import CLA
from pypfopt import black_litterman
from pypfopt.black_litterman import BlackLittermanModel
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


# how many days to train
tr_days = 100



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
    def __init__(self, id, name, market_cap, latest_day):
        self.id = id
        self.name = name
        self.mc = market_cap
        self.latest_day = latest_day



        
class CoinAnalyzer:
    
    def __init__(self):
        pass

    ## get correlation between coins
    def correlation(coins: pd.DataFrame, verbose=False) -> np.ndarray:
        return coins.iloc[1:].corr()

    def mean(self, price: pd.DataFrame):
        return expected_returns.mean_historical_return(price, compounding=True)


    def plot_matrix(self, matrix, title, price_data):
        plt.matshow(matrix)

        if len(matrix) < 10:
            plt.xticks(range(price_data.iloc[1:].select_dtypes(['number']).shape[1]), price_data.select_dtypes(['number']).columns, fontsize=14, rotation=45)
            plt.yticks(range(price_data.iloc[1:].select_dtypes(['number']).shape[1]), price_data.select_dtypes(['number']).columns, fontsize=14)
        else:
            plt.tick_params(
                axis='both',          # changes apply to the x-axis
                which='both',      # both major and minor ticks are affected
                bottom=False,      # ticks along the bottom edge are off
                top=False,         # ticks along the top edge are off
                labelbottom=False,
                labelleft=False,
                labeltop=False,
                right=False,
                left=False) # labels along the bottom edge are off


        cb = plt.colorbar()
        if len(matrix) < 10:
            plt.clim(0, 3)
        else:
            pass
            # plt.clim(-3, 10)
        cb.ax.tick_params(labelsize=14)

        plt.title(title)

        # plt.show

    ## plot correlations of coins
    def corr_plot(self, df):
        mat = df.iloc[1:].corr()

        self.plot_matrix(mat)


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

        np.fill_diagonal(prefs_risk, np.sqrt([1.9, 1.2, 1.3, 1.5, 1.7, 1.1, 1.2, 1.3]))
        prefs_risk = pd.DataFrame(prefs_risk, columns=r.columns)

        # print(prefs_risk)
        # print(prefs_risk.T.to_numpy())
        
        comprehensive_risk = (prefs_risk @ r) @ prefs_risk.T

        # print(comprehensive_risk)

        return comprehensive_risk
        


class CoinHandler:

    def __init__(self):
        self.coins = {}

    ## get n coins from database
    def get_coins(self):
        ## initialize coins from database
        pass

    ## if daily change is more than 5%
    def check_change(self):
        ## get last two rows of df, use them to calc pct change
        ## if true, call Portfolio.rebalance
        pass


def price_graph(datafrm):
    datafrm.pct_change().plot(legend=True,
        title='Return by Day', ylabel='Percent returns', colormap='Set2', logy=False)
    # plt.tight_layout()
    # plt.show()

def cumul_returns(datafrm):
    datafrm.pct_change().add(1).cumprod().sub(1).plot(legend=True,
        title='Cumulative Returns by Day', ylabel='Percent returns', colormap='Set2')
    # plt.tight_layout()
    # plt.show()

ALL_PORTFOLIOS = {}

class Portfolio:

    def __init__(self, user_id: str, name: str, prefs: Preferences, prices):
        self.user = user_id
        self.name = name
        self.prefs = prefs
        self.created = datetime.date.today()
        self.last_rebal = self.created
        self.assets = {}
        self.cap = self.prefs['capital']
        self.ca = CoinAnalyzer()
        self.history = []

        if self.user in ALL_PORTFOLIOS:
            ALL_PORTFOLIOS[self.user].append(self)
        else:
            ALL_PORTFOLIOS[self.user] = [self]

        self.create_portfolio(prices)

    def __str__(self) -> str:
        return f'User {self.user} has this portfolio with {self.assets}'

    def update_prefs(self, new_prefs: Preferences):
        self.prefs.update(new_prefs)
        logging.debug('prefs updated')
        self.create_portfolio()



    ## fuction that plots ef
    def plot_ef(self, e: EfficientFrontier):
        e = copy.deepcopy(e)
        fig, ax = plt.subplots()
        plotting.plot_efficient_frontier(e, ef_param="return", ax=ax, show_assets=True)



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
        # plt.tight_layout()
        # plt.show()


    def plot_w(self):
        fig, ax = plt.subplots()
        plotting.plot_weights(self.assets, ax)

    ## new portfolio. maybe consider sector constraints
    def create_portfolio(self, prices):
        mu = self.ca.mean(prices)
        S = self.ca.cov_matrix(prices, self.prefs, False)

        self.ca.plot_matrix(S, "Comprehensive Covariant Matrix", prices)

        ef = EfficientFrontier(mu, S)


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
            if ef.portfolio_performance()[0] < -1 * np.Infinity:
                # print("neg returns")
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
                try:
                    ef = EfficientFrontier(mu, S)
                    ef.add_sector_constraints(sect_map, {}, sect_prefs)
                    ef.max_quadratic_utility()
                except:
                        ef = EfficientFrontier(mu, S)
                        ef.add_sector_constraints(sect_map, {}, sect_prefs)
                        ef.efficient_risk(.5)
        else:
            ef.efficient_risk(1.5)

        self.ef = ef
        self.assets = ef.clean_weights()

        self.last_rebal = datetime.date.today()
        # self.plot_w()

        # print(f'portfolio rebalanced\n{self.assets}')
        # self.ef.portfolio_performance(verbose=True)

    def test_portfolio(self, full_data, last_rebal, days, verbose=False):
        final_val = 0

        for coin, weight in self.assets.items():
            final_val += np.round(weight * self.cap / full_data[coin].iloc[last_rebal], 5) * full_data[coin].iloc[days + tr_days - 1] 
        if verbose:
            print(f'The return of this portfolio after {days} days is ${final_val - self.cap}, which is {np.round(final_val - self.cap, 2) / self.cap * 100}% \n\n')
        return final_val

    def set_weights(self, weights: list, full_data) -> None:
        self.assets = dict(zip(full_data.columns, weights))


