import PaymentRoute from '../routes/payment.route.js';
import AuthRoute from '../routes/auth.routes.js';
import config from './variable.config.js';

const version = config.VERSION;

class RoutesLoader {
    init(app) {
        app.use(`/api/${version}/auth`, AuthRoute);
        app.use(`/api/${version}/payment`, PaymentRoute);
        // app.use(`/api/${version}/movies`, movieRouter);
        // app.use(`/api/${version}/roles`, roleRouter);
        // app.use(`/api/${version}/theaters`, theaterRouter);
        // app.use(`/api/${version}/shows`, showRouter);
        // app.use(`/api/${version}/bookings`, bookingRouter);
        // app.use(`/api/${version}/payments`, paymentRouter);
        // app.use(`/api/${version}/genres`, genreRouter);
        // app.use(`/api/${version}/health`, healthCheckRouter);
    }
}

export default new RoutesLoader;