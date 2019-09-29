import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { mockResponse } from './requestProcessing';
import nerMock from './mock/ner.json';
import summaryMock from './mock/summary.json';

const app = new Koa();
const router = new KoaRouter();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
});

router.post('/api/ner', (ctx, next) => {
    mockResponse(ctx, nerMock);
    next();
});

router.post('/api/summary', (ctx, next) => {
    mockResponse(ctx, summaryMock);
    next();
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
console.log('listening on 3000');
