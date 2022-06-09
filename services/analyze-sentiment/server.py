'''A RESTful API server to analyze English tweets.'''

from fastapi import FastAPI
from analyzer import SentimentAnalyzer

sentiment_analyzer = SentimentAnalyzer()
app = FastAPI()


@app.get('/')
def get_root():
    '''Get the root of the API.'''
    return {"message": "Welcome to the sentiment analysis API!"}


@app.get('/analyze')
async def get_sentiment(text):
    '''Get the sentiment of passed text.'''
    return sentiment_analyzer.compute_scores(text)
