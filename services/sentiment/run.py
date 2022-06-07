import numpy as np

from fastapi import FastAPI
from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
from scipy.special import softmax

MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"

tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
app = FastAPI()


def preprocess(text):
    new_text = []
    for word in text.split(" "):
        word = '@user' if word.startswith('@') and len(word) > 1 else word
        word = 'http' if word.startswith('http') else word
        new_text.append(word)
    return " ".join(new_text)


def analyze(text):
    text = preprocess(text)
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    result = {}
    for i in range(scores.shape[0]):
        label = config.id2label[ranking[i]].lower()
        score = float(scores[ranking[i]])
        result[label] = score
    return result


@app.get('/')
def get_root():
    return {'message': 'This is the sentiment analysis service'}


@app.get('/analyze')
async def query_sentiment_analysis(text):
    return analyze(text)
