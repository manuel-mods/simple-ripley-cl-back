module.exports = (app) => {
// Add headers
  app.use((req, res, next) => {
    // Website you wish to allow to connec
    var allowedOrigins = ['https://www.multi-play.cl'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
};
