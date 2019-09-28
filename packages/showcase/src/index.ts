import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new KoaRouter();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
});

router.post('/api/process', (ctx, next) => {
    const text: string = ctx.request.body.text;
    if (text && text.length > 0) {
        ctx.body = {};
    } else {
        ctx.status = 422;
    }
    next();
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
console.log('listening on 3000');
