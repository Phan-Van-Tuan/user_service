import { Router } from 'express';
import PaymentControler from '../controllers/payment.controller.js'
import ahf from '../middlewares/awaitHandlerFactory.middleware.js'

let router = Router();

router.post('/generate_qrcode', PaymentControler.generateQR)
router.get('/getAll', PaymentControler.getAll)
router.post('/create_payment', ahf(PaymentControler.createPayment))
router.get('/vnpay_return', ahf(PaymentControler.vnpayReturn));

export default router