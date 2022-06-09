'''Text sentiment analysis optimized for English tweets.'''

import numpy as np

from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
from scipy.special import softmax


class SentimentAnalyzer:
    '''
    A roBERTa-base model for sentiment analysis trained on ~124M tweets from Jan 2018
    to Dec 2021. It's finetuned with the TweetEval benchmarkand is suitable for English.

    Source: https://bit.ly/3aJrAiZ
    '''

    def __init__(
            self,
            model_name="cardiffnlp/twitter-roberta-base-sentiment-latest"):
        self.model_name = model_name
        self.__tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.__config = AutoConfig.from_pretrained(model_name)
        self.__model = AutoModelForSequenceClassification.from_pretrained(
            model_name)

    def __preprocess(self, text):
        '''Preprocess text for sentiment analysis.'''
        new_text = []
        for word in text.split(" "):
            word = '@user' if word.startswith('@') and len(word) > 1 else word
            word = 'http' if word.startswith('http') else word
            new_text.append(word)

        return " ".join(new_text)

    def analyze(self, text):
        '''Analyze sentiment of text.
        
        Args:
            text (str): The text to be analyzed.

        Returns:
            A dictionary of sentiment labels to scores. Available labels are:
            'positive', 'negative', 'neutral'. The scores are between 0 and 1.
        '''
        text = self.__preprocess(text)

        encoded_input = self.__tokenizer(text, return_tensors='pt')
        output = self.__model(**encoded_input)

        scores = output[0][0].detach().numpy()
        scores = softmax(scores)

        ranking = np.argsort(scores)
        ranking = ranking[::-1]

        result = {}
        for i in range(scores.shape[0]):
            label = self.__config.id2label[ranking[i]].lower()
            score = float(scores[ranking[i]])
            result[label] = score

        return result
