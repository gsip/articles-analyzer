import Koa from 'koa';
import KoaRouter from 'koa-router';
import { isEmpty } from '../validation';
import fetch from 'node-fetch';
import { newPostRequest, error } from './requests';
import { getNer } from '../constProvider';

const NER_ENTITIES_API = 'extract';

export function getNerUrl(): string {
    return `http://${getNer()}/${NER_ENTITIES_API}`;
}

export async function execute(
    ctx: Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>,
): Promise<void> {
    if (isEmpty(getNer())) {
        return await error(ctx, 'Wrong NER location', 503);
    }
    const { text } = ctx.request.body;
    if (isEmpty(text)) {
        return await error(ctx, 'Text is empty', 500);
    }

    await fetch(getNerUrl(), newPostRequest(text))
        .then((res) => res.json())
        .then((json) => {
            ctx.body = { ner: json.entities };
            ctx.status = 200;
        })
        .catch((err) => {
            console.error(err);
        });
}
