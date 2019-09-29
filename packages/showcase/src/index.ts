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
        ctx.body = {
            ner: { PER: [{ word: 'John', count: 5 }, { word: 'Mark', count: 1 }], LOC: [{ word: 'Paris', count: 5 }] },
            summary: 'Your summary',
        };
    } else {
        ctx.status = 422;
    }
    next();
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
console.log('listening on 3000');
