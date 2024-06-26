//server.js
require("dotenv").config();
const http = require('http');
const cors = require('cors');
const port = process.env.PORT;
const signupHandler = require('./signupHandler');
const loginHandler = require('./loginHandler');
const authenticateToken = require('./authenticateToken');
const weatherHandler = require('./weatherHandler');
const pool = require('./database');


const employeeLoginHandler = require('./EmployeeLoginControl/employeeHandler');
const logoutHandler = require('./logoutHandler');
const maintenanceHandler = require("./maintenanceHandler");
const restaurantExpenseHandler = require("./restaurantExpenseHandler");
const visitReportHandler = require("./visitReportHandler");
const ticketReportHandler = require("./ticketReportHandler");
const viewContactFormsHandler = require("./viewContactFormsHandler");
const editMaintenanceHandler = require("./editMaintenanceHandler");
const dashboardDataHandler = require("./dashboardDataHandler");
const financeReportHandler = require("./financeReportHandler");
const maintenanceReportHandler = require("./maintenanceReportHandler");
const addEmpHandler = require("./addEmpHandler");
const archiveEmpHandler = require("./archiveEmpHandler");
const getEmployeesHandler = require("./getEmployeesHandler");
const checkoutHandler = require("./checkoutHandler");
const loggedInEmployeeHandler = require("./loggedInEmployeeHandler");
const updateLoggedInEmployeeHandler = require("./updateLoggedInEmployeeHandler");
const maintenanceGetterEditHandler = require("./maintenanceGetterEditHandler");
const updateMaintenanceHandler = require("./updateMaintenanceHandler");
const contactUsPageHandler = require("./contactUsPageHandler");
const updateUserProfileHandler = require('./updateUserProfileHandler');
const getRecentTicketOrdersHandler = require("./getRecentTicketOrdersHandler");
const getAttractionStatusHandler = require('./getAttractionStatusHandler');
const getCurrentWeatherHandler = require('./getCurrentWeatherHandler');
const resetPasswordHandler = require('./resetPasswordHandler');
const resetStaffPasswordHandler = require('./resetStaffPasswordHandler');
const unresolvedMaintenanceHandler = require("./unresolvedMaintenanceHandler");
const getPostData = require('./postDataParser');
const getAttractions = require("./getAttractions");
const insertNewAttractions = require("./insertNewAttractions");
const deleteAttraction = require("./deleteAttraction");
const getMerch = require("./getMerch");
const addMerch = require("./addMerch");
const deleteMerch = require("./deleteMerch");
const getRestaurant = require("./getRestaurant");
const addRestaurant = require("./addRestaurant");
const deleteRestaurant = require("./deleteRestaurant");
const updateAttraction = require("./updateAttraction");
const updateMerch = require("./updateMerch");
const updateRestaurant = require("./updateRestaurant");

const corsOptions = {
  origin: ['https://dreamlandia.vercel.app', 'http://localhost:5173'],
  credentials: true,
};

const server = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.url === '/api/user' && req.method === 'GET') {
      authenticateToken(req, res, () => {
        if (req.user) {
          if (req.user.userType === 'user') {
            console.log("server -> passAuth -> valid user(200) pass to frontend user");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.user));
          } else {
            console.log("server -> passAuth -> null(403) pass to frontend user");
            res.writeHead(403, { 'Content-Type': 'application/json' });
             // res.end(JSON.stringify({ message: 'Forbidden' }));
             res.end(JSON.stringify(null));
          }
        } else {
          console.log("no token provided null(200) pass to frontend user");
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(null));
        }
      });
    }else if (req.url === '/api/user' && req.method === 'PUT') {
      updateUserProfileHandler(req, res);
    }
    else if (req.url === '/api/employee' && req.method === 'GET') {
      authenticateToken(req, res, () => {
        if (req.user) {
          if (req.user.userType === 'employee') {
            console.log("server -> passAuth -> valid employee(200) pass to frontend employee");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.user));
          } else {
            console.log("server -> passAuth -> null(403) pass to frontend employee");
            res.writeHead(403, { 'Content-Type': 'application/json' });
            // res.end(JSON.stringify({ message: 'Forbidden' }));
            res.end(JSON.stringify(null));
          }
        } else {
          console.log("no token provided null(200) pass to frontend employee");
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(null));
        }
      });
    }

    else if (req.url === '/api/tickets' && req.method === 'GET') {
      console.log('api/tickets is called in server.js');
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
    }else if (req.url === '/maintenance-report' && req.method === 'POST') {
      maintenanceReportHandler(req, res);
    }else if (req.url === '/viewContactForms' && req.method === 'POST') {
      viewContactFormsHandler(req, res);
    }else if (req.url === '/maintenance-requests' && req.method === 'POST') {
      editMaintenanceHandler(req, res);
    }else if (req.url === '/dashboardData' && req.method === 'POST') {
      dashboardDataHandler(req, res);
    }else if (req.url === '/finance-report' && req.method === 'POST') {
      financeReportHandler(req, res);
    }else if (req.url === '/checkout' && req.method === 'POST') {
      checkoutHandler(req, res);
    }else if (req.url === '/employees' && req.method === 'GET') {
      getEmployeesHandler(req, res);
    }
    else if (req.url === '/addEmp' && req.method === 'POST') {
      addEmpHandler(req, res);
    }else if (req.url === '/archiveEmp' && req.method === 'POST') {
      archiveEmpHandler(req, res);
    }else if (req.url === '/loggedInEmployee' && req.method === 'GET') {
      authenticateToken(req, res, () => {
        if (req.user) {
          if (req.user.userType === 'employee') {
            console.log("server -> passAuth -> valid employee(200) pass to frontend employee");
            const staffId = req.user.StaffID;
            loggedInEmployeeHandler(req, res, staffId);
          } else {
            console.log("server -> passAuth -> null(403) pass to frontend employee");
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(null));
          }
        } else {
          console.log("no token provided null(200) pass to frontend employee");
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(null));
        }
      });
    }else if (req.url.startsWith('/updateLoggedInEmployee') && req.method === 'POST') {
      updateLoggedInEmployeeHandler(req,res);
    }
    else if (req.url === '/get-maintenancerequests' && req.method === 'GET') {
      maintenanceGetterEditHandler(req, res);
    }
    else if (req.url === '/updateMaintenanceRequest' && req.method === 'POST') {
      updateMaintenanceHandler(req, res);
    }
    else if (req.url === '/getOrderDetails' && req.method === 'POST') {
      getPostData(req)
        .then(async (body) => {
          const { orderId } = body;
          const orderDetailsQuery = `
            SELECT
              DATE_FORMAT(mo.TransactionDate, '%Y-%m-%d') AS merchDate,
              mo.OrderID,
              m.MName,
              mo.Size,
              mo.Quantity,
              mo.TotalCost 
            FROM
              merchandise_order_detail mo
              JOIN merchandise m ON mo.ItemID = m.ItemID
            WHERE
              mo.OrderID = ?
          `;
    
          const [orderDetails] = await pool.execute(orderDetailsQuery, [orderId]);
    
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(orderDetails));
        })
        .catch((err) => {
          console.error('Error parsing request body:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error parsing request body', error: err.toString() }));
        });
    }
    else if (req.url === '/getRecentTicketOrders' && req.method === 'POST') {
      // Parse the request body as JSON
      getPostData(req)
        .then((body) => {
          console.log('Request Body:', body);
          const { userId, months, orderType } = body;
          getRecentTicketOrdersHandler(req, res, userId, months, orderType);
        })
        .catch((err) => {
          console.error('Error parsing request body:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error parsing request body', error: err.toString() }));
        });
    }
    else if(req.url === '/contact-us' && req.method == 'POST') {
      contactUsPageHandler(req, res);

    }
    else if(req.url === '/attraction-status' && req.method === 'GET') {
      getAttractionStatusHandler(req, res);
    }
    else if(req.url === '/current-weather' && req.method === 'GET') {
      getCurrentWeatherHandler(req, res);
    }else if(req.url === '/get-unresolved-maintenance-requests' && req.method === 'POST' ){
      unresolvedMaintenanceHandler(req,res);
    }
    else if(req.url === '/reset-password' && req.method === 'PUT') {
      resetPasswordHandler(req, res);
    }
    else if(req.url === '/reset-staff-password' && req.method === 'PUT') {
      resetStaffPasswordHandler(req, res);
    }else if(req.url === '/attractions' && req.method === 'GET') {
      getAttractions(req, res);
    }
    else if(req.url === '/get-merch' && req.method === 'GET') {
      getMerch(req, res);
    }
    else if(req.url === '/get-rest' && req.method === 'GET') {
      getRestaurant(req, res);
    }
    else if(req.url === '/insert-new-attractions' && req.method === 'POST') {
      insertNewAttractions(req, res);
    }
    else if(req.url === '/insert-new-merch' && req.method === 'POST') {
      addMerch(req, res);
    }
    else if(req.url === '/insert-new-rest' && req.method === 'POST') {
      addRestaurant(req, res);
    }else if(req.url === '/update-attraction' && req.method === 'POST') {
      updateAttraction(req, res);
    }
    else if(req.url === '/update-merch' && req.method === 'POST') {
      updateMerch(req, res);
    }
    else if(req.url === '/update-rest' && req.method === 'POST') {
      updateRestaurant(req, res);
    }
    else if(req.url === '/delete-attraction' && req.method === 'POST') {
      getPostData(req)
        .then((body) => {
          console.log(body);
          const id = body.id;
          deleteAttraction(req, res, id);
        })
        .catch((err) => {
          console.error('Error parsing request body:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error parsing request body', error: err.toString() }));
        });
    }else if(req.url === '/delete-merch' && req.method === 'POST') {
      getPostData(req)
        .then((body) => {
          console.log(body);
          const id = body.id;
          deleteMerch(req, res, id);
        })
        .catch((err) => {
          console.error('Error parsing request body:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error parsing request body', error: err.toString() }));
        });
    }else if(req.url === '/delete-rest' && req.method === 'POST') {
      getPostData(req)
        .then((body) => {
          console.log(body);
          const id = body.id;
          deleteRestaurant(req, res, id);
        })
        .catch((err) => {
          console.error('Error parsing request body:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error parsing request body', error: err.toString() }));
        });
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

