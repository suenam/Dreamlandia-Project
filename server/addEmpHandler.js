const pool = require('./database');
const getPostData = require('./postDataParser');
const bcrypt = require('bcrypt');

async function addEmpHandler(req, res) {
  try {
    const { fullname, address, role, email, phoneNum, password, DOB, city, state, zipcode } = await getPostData(req);
    const newPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO staff (SName, SAddress, SRole, SPhoneNumber, SEmail, SPassword, DOB, SCity, SState, SZipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullname, address, role, phoneNum, email, newPassword, DOB, city, state, zipcode]
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