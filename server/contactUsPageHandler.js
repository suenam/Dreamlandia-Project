const pool = require('./database');
const getPostData = require('./postDataParser');

async function contactUsPageHandler(req, res) {
  try {
    // Extracting data from the request body
    const { name, email, type, message, submittedTicketId, userID } = await getPostData(req);
    console.log(name, email, type, message, submittedTicketId, userID);

    // Inserting the contact information into the database
    const [result] = await pool.execute(
      'INSERT INTO contact_us_form (Cname, Cemail, Cdate, CType, Content, TicketID, UserID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, new Date(), type, message, submittedTicketId, userID]
    );

    // Sending a success response
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Message submitted successfully' }));
  } catch (error) {
    // Handling errors
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error submitting message', error: error.toString() }));
  }
}

module.exports = contactUsPageHandler;