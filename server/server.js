require("dotenv").config();
const http = require('http');
const port = process.env.PORT;
const signupHandler = require('./signupHandler');
const loginHandler = require('./loginHandler');
const authenticateToken = require('./authenticateToken');
const weatherHandler = require('./weatherHandler');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // if (req.url === '/auth/signup' && req.method === 'POST') {
  //   signupHandler(req, res);
  // } else {
  //   res.writeHead(404, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ message: 'Route not found' }));
  // }
  if (req.url === '/api/tickets' && req.method === 'GET') {
    authenticateToken(req, res, () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ /* ticket data */ }));
    });
  } else if (req.url === '/auth/login' && req.method === 'POST') {
    loginHandler(req, res);
  } else if (req.url === '/auth/signup' && req.method === 'POST') {
    signupHandler(req, res);
  } else if (req.url === '/weather' && req.method === 'POST') {
    weatherHandler(req, res);
  }else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});