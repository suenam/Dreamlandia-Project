const pool = require('./database');
const authenticateToken = require('./authenticateToken');
const getPostData = require('./postDataParser');

async function updateUserProfileHandler(req, res) {
  try {
    authenticateToken(req, res, async () => {
      if (!req.user || req.user.userType !== 'user') {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return;
      }

      const updatedUser = await getPostData(req);
      console.log('updatedUser:', updatedUser);

      const [result] = await pool.execute(
        'UPDATE user SET UName = ?, UEmail = ?, address = ?, state = ?, zipcode = ? WHERE UserID = ?',
        [updatedUser.UName, updatedUser.UEmail, updatedUser.address, updatedUser.state, updatedUser.zipcode, req.user.UserID]
      );

      if (result.affectedRows === 1) {
        const [updatedUserResult] = await pool.execute('SELECT * FROM user WHERE UserID = ?', [req.user.UserID]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUserResult[0]));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Failed to update user profile' }));
      }
    });
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}

module.exports = updateUserProfileHandler;