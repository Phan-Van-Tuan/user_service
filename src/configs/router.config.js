// import UserRoute from '../routes/user.router.js';
import AuthRoute from '../routes/auth.routes.js';

const VERSION = process.env.VERSION || 'v1';

class RoutesLoader {
    static init(app) {
        app.use(`/api/${VERSION}/auth`, AuthRoute);
        // app.use(`/api/${VERSION}/user`, UserRoute);
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

export default RoutesLoader;