import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new KoaRouter();

const generateRandomString = (): string => {
    return Math.random()
        .toString(36)
        .substring(2, 15);
};

const generateToken = (): string => {
    return generateRandomString() + generateRandomString();
};

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
    next();
});

router.post('/api/process', (ctx, next) => {
    const text: string = ctx.request.body.text;
    if (text && text.length > 0) {
        const tokenString: string = generateToken();
        ctx.body = { token: tokenString.toUpperCase() };
    } else {
        ctx.status = 422;
    }
    next();
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
console.log('listening on 3000');
