import { config } from './config';
import { appFactory } from './root';

const app = appFactory({});

const createServer = () => app.listen(config.express.port, config.express.ip, () => {
  console.info(`express is listening on http://${config.express.ip}:${config.express.port}`);
});

let server = createServer();
app.on('error', e => {
    console.error('Error', e);
    server.close();
    setTimeout(() => {
      server = createServer();
    }, 1000);
})
