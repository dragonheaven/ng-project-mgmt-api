import passport from 'passport';

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  try {
    if (error || !user) throw error;
    await req.login(user, { session: false });
  } catch (e) {
    return res.sendStatus(401);
  }

  if (err || !user) {
    return res.sendStatus(401);
  }

  req.user = user;

  return next();
};

const authentication = (req, res, next) =>
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next),
  )(req, res, next);

export default authentication;
