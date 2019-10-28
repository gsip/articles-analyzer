import KoaRouter from 'koa-router';
import Koa from 'koa';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';

export const post = (url: string, body: object): Promise<Response> => {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
};

type KoaContext = Koa.ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;

export const error = (ctx: KoaContext, error: string, code: number): void => {
    ctx.body = { error };
    ctx.status = code;
};
