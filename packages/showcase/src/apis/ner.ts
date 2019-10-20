import Koa from 'koa';
import KoaRouter from 'koa-router';
import { isTextValid } from '../validation';
import fetch from 'node-fetch';
const NER_ENTITIES_API = '/extract';

export async function execute(
    ctx: Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>,
): Promise<void> {
    if (typeof process.env.NER_API !== 'string') {
        ctx.body = 'Wrong NER location';
        ctx.status = 503;
        return;
    }
    const { text } = ctx.request.body;
    if (!isTextValid(text)) {
        ctx.body = 'Invalid text';
        ctx.status = 500;
        return;
    }
    const nerEntitiesExtractionUrl = process.env.NER_API + NER_ENTITIES_API;

    await fetch(nerEntitiesExtractionUrl, {
        method: 'post',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((json) => {
            ctx.body = { ner: json.entities };
            ctx.status = 200;
        })
        .catch((err) => {
            console.error(nerEntitiesExtractionUrl);
            console.error(err);
        });
}
