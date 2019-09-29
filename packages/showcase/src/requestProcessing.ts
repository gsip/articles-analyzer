import Koa from 'koa';
import { isTextValid } from './validation';

export const mockResponse = (ctx: Koa.ParameterizedContext, mock: object): void => {
    const text: string = ctx.request.body.text;
    if (isTextValid(text)) {
        ctx.body = mock;
    } else {
        ctx.status = 422;
    }
};
