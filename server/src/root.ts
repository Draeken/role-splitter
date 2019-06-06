import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const app = express();

const frontRoot = path.join(__dirname, '../../client/dist');

export const appFactory = (_) => {
  app.options('*', (_, res) => res.sendStatus(200));
  app.post('*', bodyParser.json());

  app.use(express.static(frontRoot));

  // app.use('/api', apiRouter({}));

  app.all('/*', (_, res) => res.sendFile('index.html', { root: frontRoot }));

  app.use((err, _, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    console.error(err);
    res.sendStatus(500);
  });

  return app;
}