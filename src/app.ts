import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import strategies from './passport';
import router from './routes';
import httpContext from 'express-http-context';
import fallback from 'express-history-api-fallback';
import errorHandler from './middlewares/errorHandler';
const helmet = require('helmet');

const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(helmet());

app.use(cors());

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/public`));
const root = `${__dirname}/public`;


app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set('request', req);
  next();
});

app.use('/api', router);
app.use(fallback('index.html', { root }));
app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');
  res.sendStatus(400);
});
app.use(errorHandler);

export default app;
