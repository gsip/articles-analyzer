import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { loadConfiguration } from './envLoader';
import { execute } from './apis/ner';

const app = new Koa();
const router = new KoaRouter();

loadConfiguration();

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
app.listen(3000);
console.log('listening on 3000');
