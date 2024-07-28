import User from '../models/user.model.js';
import crypto from 'crypto'
import { URLSearchParams } from 'url';
// import axios from 'axios'

import Payment from '../models/payment.model.js';
import config from '../configs/variable.config.js';

class PaymentControler {
    async getAll(req, res) {
        let data = await Payment.getAll()
        res.json({ status: 'success', message: 'get all payments', data: data });
    }

    createPayment(req, res) {
        const { bankCode, amount } = req.body;

        let orderId = `${Date.now()}`
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = config.vnp_TmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = config.vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = req.ip;

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params['vnp_CreateDate'] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');

        const sortedParams = Object.keys(vnp_Params).sort().reduce((r, k) => (r[k] = vnp_Params[k], r), {});
        const signData = new URLSearchParams(sortedParams).toString();
        const hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        const paymentUrl = `${vnp_Url}?${new URLSearchParams(vnp_Params).toString()}`;

        res.json({ status: 'success', message: 'Created payment url', data: paymentUrl });
    }

    async vnpayReturn(req, res) {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        const sortedParams = Object.keys(vnp_Params).sort().reduce((r, k) => (r[k] = vnp_Params[k], r), {});
        const signData = new URLSearchParams(sortedParams).toString();
        const hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            let newPayment = new Payment(vnp_Params.vnp_TxnRef, 1, vnp_Params.vnp_Amount, vnp_Params.vnp_BankCode)
            await Payment.create(newPayment);
            res.json({ status: 'success', message: 'Payment verified', data: vnp_Params });
        } else {
            res.json({ status: 'failure', message: 'Invalid signature', data: vnp_Params });
        }
    }
}


export default new PaymentControler;