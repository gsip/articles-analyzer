import * as Koa from 'koa';
import { spawn } from 'child_process';

async function python(...arg): Promise<string> {
    const pythonProcess = spawn('python', ['./src/script.py', ...arg]);
    pythonProcess.stderr.on('data', (error) => console.log('Error: ', error.toString('utf8')));
    // eslint-disable-next-line no-undef
    return new Promise<string>((resolve) => pythonProcess.stdout.on('data', resolve));
}

const app = new Koa();

app.use(async (ctx) => {
    const result = await python('Hello', ' Gleb');
    ctx.body = 'Python script return: ' + result;
});

app.listen(3000);
