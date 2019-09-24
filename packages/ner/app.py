import spacy
from flask import Flask, render_template_string, request, json
from flask.json import jsonify
from spacy import displacy
import gc
from entities_converter import clean, to_counted_ents

app = Flask(__name__)
nlp = spacy.load('en_core_web_sm')

N = 400000


def remove_whitespace_entities(doc):
    doc.ents = [e for e in doc.ents if not e.text.isspace()]
    return doc


nlp.add_pipe(remove_whitespace_entities, after='ner')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/entities', methods=['post'])
def html_entities():
    data = json.loads(request.data)
    text = data['text']
    print(text)
    if not text:
        return jsonify({'error': "specify 'text' parameter"}), 200
    html = ''
    for i in range(0, len(text), N):
        part = text[i:i + N]
        doc = nlp(part)
        print(doc.ents)
        html += displacy.render([doc], style='ent')
        gc.collect()

    return render_template_string(html)


@app.route('/extract', methods=['post'])
def extract_entities():
    data = json.loads(request.data)
    text = data['text']
    if not text:
        return jsonify({'error': "specify 'text' parameter"}), 200

    ents = []
    html = ''
    print(f'Start NER extraction: {len(text) / N} parts')
    for i in range(0, len(text), N):
        print(f'part {i}')
        part = text[i:i + N]
        doc = nlp(part)
        html += displacy.render([doc], style='ent')
        ents += [{"t": clean(e.text),
                  "search_key": clean(e.text).lower(),
                  "s": e.start_char,
                  "e": e.end_char,
                  "l": e.label_
                  } for e in doc.ents]

    print('Return result')
    return jsonify({"html": html, "ents": to_counted_ents(ents)})


if __name__ == '__main__':
    app.run(port=3008)
