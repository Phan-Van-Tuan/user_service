import passport from 'passport';
const { use } = passport;
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

use(new GoogleStrategy({
    clientID: YOUR_CLIENT_ID,
    clientSecret: YOUR_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'  // Địa chỉ callback URI bạn đã đăng ký
},
    (accessToken, refreshToken, profile, done) => {
        // Xử lý khi người dùng đăng nhập thành công
        return done(null, profile);
    }
));


export default passport;
