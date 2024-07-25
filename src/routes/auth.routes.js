import { Router } from 'express';
import passport from 'passport';
const { authenticate } = passport;

const router = Router();

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
