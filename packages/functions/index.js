const functions = require('firebase-functions');
const fetch = require('node-fetch');

const runtimeConfig = {
    timeoutSeconds: 30,
    memory: '128MB',
};

const isEmptyString = (text) => typeof text !== 'string' || text.length == 0;
const MAX_TEXT_LENGTH = 250000;

const post = (url, body) =>
    fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });

const checkStatus = (res) => {
    if (res.ok) {
        return res.json();
    }
    throw Error(res.statusText);
};

const newResult = (error, status) => {
    return { error, status };
};

const validateParameters = (text) => {
    if (isEmptyString(text)) {
        return newResult('[text] cannot be empty', 404);
    }

    if (text.length > MAX_TEXT_LENGTH) {
        return newResult('[text] is too long', 413);
    }

    return { error: '', status: 200 };
};

exports.nerBody = (request, response) => {
    const text = request.body.text;
    const checkResult = validateParameters(text);

    if (checkResult.status !== 200) {
        console.error(checkResult.error);
        response.send({ error: checkResult.error });
        return new Promise(() => {
            return { error: checkResult.error };
        });
    }
    return post(process.env.NER_API, { text })
        .then(checkStatus)
        .then((res) => {
            response.send({ ner: res.entities });
            return { entities: res.entities };
        })
        .catch((error) => {
            console.error(error);
            response.send({ error: 'Error during NER extraction' });
            return { error };
        });
};

exports.sumBody = (request, response) => {
    const text = request.body.text;
    const checkResult = validateParameters(text);

    if (checkResult.status !== 200) {
        console.error(checkResult.error);
        response.send({ error: checkResult.error });
        return new Promise(() => {
            return { error: checkResult.error };
        });
    }
    return post(process.env.SUM_API, { text, sentences: parseInt(process.env.SUM_SENTENCES, 10) })
        .then(checkStatus)
        .then((res) => {
            response.send({ summary: res.summary });
            return { summary: res.summary };
        })
        .catch((error) => {
            console.error(error);
            response.send({ error: 'Error during summarization' });
            return { error };
        });
}

exports.ner = functions.runWith(runtimeConfig).https.onRequest(exports.nerBody);
exports.sum = functions.runWith(runtimeConfig).https.onRequest(exports.sumBody);
