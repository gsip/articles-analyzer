import Koa from 'koa';
import KoaRouter from 'koa-router';
import { isTextValid } from '../validation';
import fetch from 'node-fetch';
const NER_ENTITIES_API = '/extract';

export async function execute(ctx: Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>) {
    process.env.NER_API = 'http://127.0.0.1:5000'; // TODO: remove
    if (typeof process.env.NER_API !== 'string') {
        ctx.body = 'Wrong NER location';
        ctx.status = 503;
    }
    const textToProcess = ctx.request.body.text;
    if (!isTextValid(textToProcess)) {
        ctx.body = 'Invalid text';
        ctx.status = 500;
    }
    const nerEntitiesExtractionUrl = process.env.NER_API + NER_ENTITIES_API;
    console.log(`post to ${nerEntitiesExtractionUrl}: ${textToProcess}`);

    const body = { text: textToProcess };
    await fetch(nerEntitiesExtractionUrl, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((json) => {
            console.log('Success', json);
            ctx.body = { ner: json.entities };
            ctx.status = 200;
        })
        .catch(console.error);
}
