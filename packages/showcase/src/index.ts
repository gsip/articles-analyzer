import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { execute } from './apis/ner';
import { loadEnv } from './envLoader';
import { getAppPort } from './constProvider';

const app = new Koa();
const router = new KoaRouter();

loadEnv();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
});

router.post('/ner', async (ctx, next) => {
    await execute(ctx);
    await next();
});

router.post('/api/summary', (ctx, next) => {
    ctx;
    next();
});

app.use(bodyParser());
app.use(router.routes());
const port = getAppPort();
app.listen(port);
console.log(`listening on ${port}`);
