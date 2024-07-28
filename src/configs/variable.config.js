import dotenv from 'dotenv';
dotenv.config();

const version = process.env.VERSION || 'v1';
const port = process.env.PORT || 3002;

const config = {
    // app
    VERSION: version,
    PORT: port,

    // database mysql
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,

    // payment vnpay
    vnp_TmnCode: process.env.VNP_TMNCODE,
    vnp_HashSecret: process.env.VNP_HASHSECRET,
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_ReturnUrl: `http://localhost:${port}/api/${version}/payment/vnpay_return`,
}

export default config;
