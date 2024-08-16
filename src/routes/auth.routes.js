import { Router } from 'express';
import passport from 'passport';
import Signup from '../controllers/user.controller.js';

const { authenticate } = passport;

const router = Router();

router.post('/signup', Signup.signUp);
router.post('/login', Signup.login);
router.post('/verify/:confimationToken', Signup.verifyEmail );

router.get('/', (req, res) => {
    res.json("hello all members, my name is JPatrick!, this is post auth");
});
router.get('/', (req, res) => {
    res.json("hello all members, my name is JPatrick!, this is post auth");
});

router.get('/google',
    // authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    // authenticate('google', { failureRedirect: '/login' }),
    // (req, res) => {
    //     // Xử lý khi đăng nhập thành công, ví dụ: redirect đến trang chính
    //     res.redirect('/');
    // }
);

export default router;
