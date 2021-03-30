let errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                errcode: err.status,
                error: err.originalError ? err.originalError.message : err.message,
            };
        } else
            if (err.status !== 200) {
                ctx.body = {
                    success: false,
                    errcode: err.status,
                    error: err.originalError ? err.originalError.message : err.message,
                };
            } else {
                throw err;
            }
    });
}

module.exports = errorHandle