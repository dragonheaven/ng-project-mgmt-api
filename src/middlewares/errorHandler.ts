import InvalidRequestError from '../errors/InvalidRequestError';
import { logError } from '../logger';

export default async function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof InvalidRequestError) {
    console.log(err);

    return res.status(400).json({
      error: {
        message: err.message
      }
    });
  }

  res.status(500).json({
    error: {
      message: 'Interner Serverfehler'
    }
  });

  await logError(err, req);
}
