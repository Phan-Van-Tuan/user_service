class CatchLoader {
    static init(app) {
        app.use((req, res, next) => {
            const err = new Error('Endpoint Not Found')
            err.name = "Not Found";
            err.status = 404;
            next(err);
        });

        app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                error: {
                    name: err.name || "Internal Server Error",
                    status: err.status || 500,
                    message: err.message || "Something went wrong!!"
                }
            });
        });
    }
}

export default CatchLoader;