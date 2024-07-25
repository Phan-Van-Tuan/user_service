function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log lỗi ra console để debug (có thể thay đổi tùy theo nhu cầu)

    // Kiểm tra nếu response đã được gửi đến client thì không xử lý nữa
    if (res.headersSent) {
        return next(err);
    }

    // Xử lý lỗi dựa vào loại lỗi
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Xử lý lỗi SyntaxError từ JSON parse hoặc bodyParser
        return res.status(400).json({ error: 'Dữ liệu JSON không hợp lệ' });
    }

    // Xử lý các loại lỗi khác
    res.status(500).json({ error: 'Đã xảy ra lỗi không xác định' });
}

export default errorHandler;
