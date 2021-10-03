import puppeteer from 'puppeteer';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

async function ssr(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content(); // serialized HTML of page DOM.
    try {
        await page.pdf({
            path: path.join(__dirname, '../pdf'), format: 'A4'
        });
    } catch (error) {
        console.log(error)

    }

    await browser.close();
    return html;
}


import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.mjs';
import usersRouter from './routes/users.mjs';

const app = express();
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

try {
    ssr('http://localhost:3000')

} catch (error) {
    console.log(error)
}

export default app;

