const assert = require('assert');
const sinon = require('sinon');

const { nerBody } = require('..');

it('should print name', async () => {
    const req = { body: { text: 'Hello John' } };
    const res = { send: sinon.stub() };

    nerBody(req, res).then(() => {
        assert.ok(res.send.calledOnce);
        assert.deepStrictEqual(res.send.firstCall.args, [{ ner: { PERSON: [{ count: 1, word: 'John' }] } }]);
    });
});

it('should return error if [text] is empty', async () => {
    const req = { body: { text: '' } };
    const res = { send: sinon.stub() };

    nerBody(req, res).then(() => {
        assert.deepEqual(res.send.firstCall.args, [{ error: '[text] cannot be empty' }]);
    });
});

it('should return error if [text] is longer than 250k', async () => {
    const req = { body: { text: 'a'.repeat(250001) } };
    const res = { send: sinon.stub() };

    nerBody(req, res).then(() => {
        assert.deepEqual(res.send.firstCall.args, [{ error: '[text] is too long' }]);
    });
});
