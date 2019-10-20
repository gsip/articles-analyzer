import KoaRouter from 'koa-router';
import Koa from 'koa';

export const newPostRequest = (text: string): object => {
    return {
        method: 'post',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
    };
};

type KoaContext = Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;

export const error = (ctx: KoaContext, error: string, code: number): void => {
    ctx.body = { error };
    ctx.status = code;
};
