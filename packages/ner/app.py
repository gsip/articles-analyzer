import spacy
from flask import Flask, render_template_string, request, json
from flask.json import jsonify
from spacy import displacy
import gc
from entities_converter import clean, to_counted_ents

app = Flask(__name__)
nlp = spacy.load('en_core_web_sm')

BATCH_SIZE = 50000
MAX_TEXT_LENGTH = 150000


def remove_whitespace_entities(doc):
    doc.ents = [e for e in doc.ents if not e.text.isspace()]
    return doc


nlp.add_pipe(remove_whitespace_entities, after='ner')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/extract', methods=['post'])
def extract_entities():
    data = json.loads(request.data)
    text = data['text']
    if not text:
        return jsonify({'error': "specify 'text' parameter"}), 200
    text_length = len(text)
    if text_length > MAX_TEXT_LENGTH:
        return jsonify({'error': f"Max text length exceeded: {text_length} > {MAX_TEXT_LENGTH}"}), 200

    ents = []
    print(f'Start NER extraction: {text_length / BATCH_SIZE} parts')
    for i in range(0, text_length, BATCH_SIZE):
        part = text[i:i + BATCH_SIZE]
        doc = nlp(part)
        ents += [{"t": clean(e.text),
                  "search_key": clean(e.text).lower(),
                  #   "s": e.start_char,
                  #   "e": e.end_char,
                  "l": e.label_
                  } for e in doc.ents]

    return jsonify({"ents": to_counted_ents(ents)})


if __name__ == '__main__':
    app.run(port=3008)
