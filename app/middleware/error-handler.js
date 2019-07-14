module.exports = (app) => {
  app.use((err, req, res, next) => {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
    next();
  });
};
