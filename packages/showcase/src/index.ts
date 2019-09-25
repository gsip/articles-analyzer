import Koa from 'koa';
import KoaRouter from 'koa-router';

const app = new Koa();
const router = new KoaRouter();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
});

app.use(router.routes());

app.listen(3000);
console.log('listening on 3000');
