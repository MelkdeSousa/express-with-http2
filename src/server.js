const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', function (req, res) {
  res.send('Serving using HTTP2!');
});

const serverKey = path.join(__dirname, '..', 'server.key')
const serverCert = path.join(__dirname, '..', 'server.crt')

const options = {
  key: fs.readFileSync(serverKey),
  cert: fs.readFileSync(serverCert)
};

spdy
  .createServer(options, app)
  .listen(3000, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.log('Listening on port: ' + 3000 + '.');
  });