import re

chars_to_remove = re.compile(r",;\t\n")


def split_to_ent_chunks(ents):
    chunks = {}
    for ent in ents:
        label = ent['l']
        if not chunks.keys().__contains__(label):
            chunks[label] = []
        chunks[label].append(ent)

    return chunks


def to_counted_ents(ents):
    chunks = split_to_ent_chunks(ents)
    reduced = {}
    for label, entities in chunks.items():
        reduced[label] = count_ents(entities)

    return reduced


def count_ents(entities):
    counted = {}
    for ent in entities:
        token = ent['search_key']
        if not counted.__contains__(token):
            counted[token] = []
        counted[token].append(ent)
    res = []

    for token, arr in counted.items():
        orig_token = arr[0]['t']
        res.append([orig_token, len(arr)])

    res.sort(key=lambda x: x[1], reverse=True)

    return res


def clean(word: str):
    filtered_word = chars_to_remove.sub('', word)
    return filtered_word.strip()
