import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next();
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decode._id,
      username: decode.username,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decode.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decode._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    // console.log(decode);
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
