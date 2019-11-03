import math
import time

from math import ceil

from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.edmundson import EdmundsonSummarizer as edmund_summarizer
from sumy.summarizers.kl import KLSummarizer as kl_summarizer
from sumy.summarizers.lex_rank import LexRankSummarizer as lex_rank_summarizer
from sumy.summarizers.lsa import LsaSummarizer as lsa_summarizer
from sumy.summarizers.luhn import LuhnSummarizer as luhn_summarizer
from sumy.summarizers.sum_basic import SumBasicSummarizer as basic_summarizer
from sumy.summarizers.text_rank import TextRankSummarizer as text_rank_summarizer
from sumy.utils import get_stop_words

from flask import Flask, json, request
from flask.json import jsonify


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'


def validate_params(data, name, current):
    if not current and not data.__contains__(name):
        return f"specify '{name}' parameter"
    else:
        return current

def summarize(data):
    error = validate_params(data, 'text', None)
    # error = validate_params(data, 'sentences', None)
    # error = validate_params(data, 'sent', error)
    if error:
        return jsonify({'error': error}), 200
    doc = to_doc(data['text'])
    sentences = data.get('sentences') or 5
    summary = process("lsa", doc, sentences, len(data['text']))
    return jsonify({"summary": summary}), 200


@app.route('/sum', methods=['post'])
def sum():
    return summarize(json.loads(request.get_data(as_text=True)))
    

def process(method, doc, sent, text_length):
    print("Method:", method)
    res = {
        "sent": int(sent),
        "method": method,
        "spent": 0
    }
    try:
        if method in ['text_rank', 'lex_rank'] and text_length > 250000:
            res['error'] = 'TOO_LONG'
            print("File is too long")
        else:
            time1 = time.time()
            print('Start summarization')
            summary = summarize_doc(method, doc, sent)
            time2 = time.time()
            time_spent = math.floor((time2 - time1) * 1000)
            print('Finished. Spent time:', time_spent)
            res['spent'] = time_spent
            res['text'] = summary if summary else 'Could not summarize.'

    except Exception as e:
        res['error'] = e
        print("Exception thrown", e)

    # return {f"summary.{method}": res}
    return summary


def strSumySentences(sentences, sent_num):
    if sent_num > 0:
        step = int(ceil(len(sentences) / sent_num))
        print(f'Steps: {step} {type(step)}')
        sentences = sentences[0::step]

    finalSum = ""
    for sumySent in sentences:
        noLine = str(sumySent).replace("\n", " ")
        finalSum += noLine + " "

    return finalSum


def summarize_doc(name, doc, sent):
    summarizer_model = sum_model(name)
    summarizer = summarizer_model(Stemmer("english"))
    if name == 'edmund':
        summarizer.bonus_words = {'sime'}
    summarizer.stop_words = get_stop_words("english")
    summary = summarizer(doc, sent)
    return strSumySentences(summary, sent)


def to_doc(text):
    text_to_process = text
    if type(text_to_process) == bytes:
        text_to_process = text.decode('utf-8', errors='ignore')
    return PlaintextParser.from_string(text_to_process, Tokenizer("english")).document


def summarize_text(name, text, sent):
    return summarize_doc(name, to_doc(text), sent)


def sum_model(name):
    if name == 'basic':
        return basic_summarizer
    if name == 'edmund':
        return edmund_summarizer
    if name == 'luhn':
        return luhn_summarizer
    if name == 'lex_rank':
        return lex_rank_summarizer
    if name == 'text_rank':
        return text_rank_summarizer
    if name == 'kl':
        return kl_summarizer
    if name == 'lsa':
        return lsa_summarizer
    raise Exception('Unknown summarizing model: ' + name)



if __name__ == '__main__':
    app.run(port=3006, debug=True)

