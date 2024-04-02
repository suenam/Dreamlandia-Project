const pool = require('./database');
const getPostData = require('./postDataParser');

async function addEmpHandler(req, res) {
    try {
      const { fullname, address, role, email, phoneNum, password, DOB } = await getPostData(req);

      const [result] = await pool.execute(
        'INSERT INTO staff (SName, SAddress, SRole, SPhoneNumber, SEmail, SPassword, DOB) VALUES (?, ?, ?,?,?,?, ?)',
        [fullname, address, role, phoneNum, email, password, DOB]
      );

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created successfully' }));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error creating user', error: error.toString() }));
    }
  }


module.exports = addEmpHandler;
