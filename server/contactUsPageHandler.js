const pool = require('./database');
const getPostData = require('./postDataParser');

async function contactUsPageHandler(req, res) {
  try {
    // Extracting data from the request body
    const { name, ticketId, email, type, message } = await getPostData(req);

    // Inserting the contact information into the database
    const [result] = await pool.execute(
      'INSERT INTO contact_us (name, ticketId, email, type, message) VALUES (?, ?, ?, ?, ?)',
      [name, ticketId, email, type, message]
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
