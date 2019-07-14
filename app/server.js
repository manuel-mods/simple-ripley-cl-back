const http = require('http');
const express = require('express');
const middleware = require('./middleware');
const endpoints = require('./endpoints');
const app = express();
const port = process.env.PORT || 5010;
const server = http.createServer(app);
const startedAt = new Date();

middleware(app);
endpoints(app);

app.get('/', (req, res) => {
  const currentDateTime = new Date();
  res.status(200).json({
    started: startedAt.toISOString(),
    uptime: currentDateTime.getTime() - startedAt.getTime(),
  });
});

app.post('/ping', (req, res) => {
  res.send('pong');
});

server.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  console.log('started at', startedAt.toISOString());
  console.log('running on port', port);
});

module.exports = server;
