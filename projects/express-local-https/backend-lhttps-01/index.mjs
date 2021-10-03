

import express from 'express';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.mjs';
import usersRouter from './routes/users.mjs';
const app = express();


try {
    /*
    * This code redirects http to https ... only works with 127.0.0.1, localhost, and  0.0.0.0 
    *...anything like a real domain (gaba.dev) will not work in modern browsers because https:// is turned on before reaching servers
    * TODO 1. Put ports in an env file so things are configurable
    */

    app.use(function (req, res, next) {
        if (req.secure) {
            next();
        } else {
            res.redirect(`https://${req.headers.host}${req.url}`.replace('3000', '3443'));
        }
    });

    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
} catch (error) {

}


export default app;

