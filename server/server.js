//server.js
require("dotenv").config();
const http = require('http');
const cors = require('cors');
const port = process.env.PORT;
const signupHandler = require('./signupHandler');
const loginHandler = require('./loginHandler');
const authenticateToken = require('./authenticateToken');
const weatherHandler = require('./weatherHandler');

const employeeLoginHandler = require('./EmployeeLoginControl/employeeHandler');
const logoutHandler = require('./logoutHandler');
const maintenanceHandler = require("./maintenanceHandler");
const restaurantExpenseHandler = require("./restaurantExpenseHandler");
const visitReportHandler = require("./visitReportHandler");
const ticketReportHandler = require("./ticketReportHandler");
const viewContactFormsHandler = require("./viewContactFormsHandler");
const editMaintenanceHandler = require("./editMaintenanceHandler");

const corsOptions = {
  origin: ['https://dreamlandia.vercel.app', 'http://localhost:5173'],
  credentials: true,
};

const server = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url === '/api/user' && req.method === 'GET') {
      console.log('api/user is called in server.js');
      authenticateToken(req, res, () => {
        if (req.user) {
          console.log("entering if req.user...")
          if (req.user.userType === 'user') {
            console.log("entering if req.user.userType is user...")
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.user));
          } else {
            console.log("entering if req.user.userType NOT user...")
            res.writeHead(403, { 'Content-Type': 'application/json' });
            // res.end(JSON.stringify({ message: 'Forbidden' }));
          }
        } else {
          console.log("entering if NOT req.user...")
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(null));
        }
      });
    }
     // if (req.url === '/auth/signup' && req.method === 'POST') {
  //   signupHandler(req, res);
  // } else {
  //   res.writeHead(404, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ message: 'Route not found' }));
  // }
    else if (req.url === '/api/employee' && req.method === 'GET') {
      console.log('api/employee is called in server.js');
      authenticateToken(req, res, () => {
        if (req.user) {
          if (req.user.userType === 'employee') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.user));
          } else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            // res.end(JSON.stringify({ message: 'Forbidden' }));
          }
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(null));
        }
      });
    }

    else if (req.url === '/api/tickets' && req.method === 'GET') {
      authenticateToken(req, res, () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ /* ticket data */ }));
      });
    } else if (req.url === '/auth/login' && req.method === 'POST') {
      loginHandler(req, res);
    }else if (req.url === '/auth/logout' && req.method === 'POST') {
      logoutHandler(req, res);
    }else if (req.url === '/auth/signup' && req.method === 'POST') {
      signupHandler(req, res);
    }else if (req.url === '/employee/login' && req.method === 'POST') {
      employeeLoginHandler(req, res);
    } else if (req.url === '/weatherform' && req.method === 'POST') {
      weatherHandler(req, res);
    } else if (req.url === '/maintenance-requests' && req.method === 'POST') {
      maintenanceHandler(req, res);
    }else if (req.url === '/expense-restaurant' && req.method === 'POST') {
      restaurantExpenseHandler(req, res);
    }else if (req.url === '/visit-report' && req.method === 'POST') {
      visitReportHandler(req, res);
    }else if (req.url === '/ticket-report' && req.method === 'POST') {
      ticketReportHandler(req, res);
    }else if (req.url === '/viewContactForms' && req.method === 'POST') {
      viewContactFormsHandler(req, res);
    }else if (req.url === '/maintenance-requests' && req.method === 'POST') {
      editMaintenanceHandler(req, res);
    }
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
