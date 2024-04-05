const pool = require('./database');
const getPostData = require('./postDataParser');
const authenticateToken = require('./authenticateToken');

async function contactUsPageHandler(req, res) {
  try {
    authenticateToken(req, res, async () => {
      if (!req.user || req.user.userType !== 'user') {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return;
      }

      const { name, email, type, message, submittedTicketId } = await getPostData(req);
      const userId = req.user.UserID;

      // console.log('Extracted data:', { name, email, type, message, submittedTicketId, userId });

      console.log('Executing database query...');
      const [result] = await pool.execute(
        'INSERT INTO contact_us_form (Cname, Cemail, Cdate, CType, Content, TicketID, UserID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, new Date(), type, message, submittedTicketId, userId]
      );
      console.log('Database query executed:', result);

      if (result.affectedRows > 0) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Message submitted successfully' }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error submitting message' }));
      }
    });
  } catch (error) {
    console.error('Error in contactUsPageHandler:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error submitting message', error: error.toString() }));
  }
}

module.exports = contactUsPageHandler;


