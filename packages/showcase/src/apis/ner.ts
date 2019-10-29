import Koa from 'koa';
import KoaRouter from 'koa-router';
import { isEmpty } from '../validation';
import { post, error } from './requests';
import { getNer } from '../constProvider';

const NER_ENTITIES_API = 'extract';

type ContextType = Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;

export function getNerUrl(): string {
    return `http://${getNer()}/${NER_ENTITIES_API}`;
}

export async function execute(ctx: ContextType): Promise<void> {
    if (isEmpty(getNer())) {
        return error(ctx, 'Wrong NER location', 503);
    }
    const { text } = ctx.request.body;
    if (isEmpty(text)) {
        return error(ctx, 'Text is empty', 500);
    }

    await post(getNerUrl(), { text })
        .then((res) => res.json())
        .then((json) => {
            ctx.body = { ner: json.entities };
            ctx.status = 200;
        })
        .catch((err) => {
            console.error(err);
        });
}
