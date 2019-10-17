import Koa from 'koa';
import KoaRouter from 'koa-router';
import Axios from 'axios';
import { isTextValid } from '../validation';

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
    console.log(`Axios.post to ${nerEntitiesExtractionUrl}: ${textToProcess}`);

    await Axios.post(nerEntitiesExtractionUrl, {
        text: textToProcess,
    })
        .then((res) => {
            console.log('Success', res.data);
            ctx.body = { ner: res.data.ents };
            ctx.status = 200;
        })
        .catch(console.error);
}
