import Koa from 'koa';
import { isEmpty } from './validation';

export const mockResponse = (ctx: Koa.ParameterizedContext, mock: object): void => {
    const text: string = ctx.request.body.text;
    if (isEmpty(text)) {
        ctx.status = 422;
    } else {
        ctx.body = mock;
    }
};
