import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import Product from './models/Product';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = await Product.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export default { jwt: new JwtStrategy(jwtOptions, jwt) };
