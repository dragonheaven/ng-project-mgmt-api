import './setupMongoose';
import { logError } from './logger';
import app from './app';

const PORT = process.env.PORT || 8080;

process.on('uncaughtException', async (err) => {
  await logError(err);
  process.exit(1);
});


app.listen(PORT, () => {
  console.log(`Simple Node server is online.`);
  console.log(`PORT: ${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`MONGO_HOSTNAME: ${process.env.MONGO_HOSTNAME}`);
  console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
});
