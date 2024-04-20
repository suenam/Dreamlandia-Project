// checkoutHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');

async function checkoutHandler(req, res) {
  try {
    const { tickets,
      visitDate,
      foodTickets,
      attractions,
      userID,
      merchItems } = await getPostData(req);

    // Convert tickets to format in the database
    const ticketRecords = [];
    for (const [ticketType, quantity] of Object.entries(tickets)) {
      for (let i = 0; i < quantity; i++) {
        const formattedTicketType = ticketType.replace('Ticket', '');
        const capitalizedTicketType = formattedTicketType.charAt(0).toUpperCase() + formattedTicketType.slice(1);

        ticketRecords.push({
          TType: capitalizedTicketType,
          TPurchaseDate: new Date(),
          TExpiryDate: new Date(visitDate),
          TPrice: getTicketPrice(capitalizedTicketType),
          UserID: userID,
        });
      }
    }
    console.log('ticketRecords:', ticketRecords);
    console.log('foodTickets:', foodTickets);
    console.log('attractions:', attractions);
    console.log('merchItems:', merchItems);

    // Batch insertion of ticket data
    const query = 'INSERT INTO ticket (TType, TPurchaseDate, TExpiryDate, TPrice, UserID) VALUES ?';
    const values = ticketRecords.map(record => [
      record.TType,
      record.TPurchaseDate,
      record.TExpiryDate,
      record.TPrice,
      record.UserID,
    ]);

    let insertedTicketIDs = null
    if (ticketRecords.length > 0) {
      const [result] = await pool.query(query, [values]);
      insertedTicketIDs = result.insertId;
    }


    // Update attraction_joint table
    for (let i = 0; i < ticketRecords.length; i++) {
      const ticketID = insertedTicketIDs + i;
      for (const attractionName of attractions) {
        const attractionQuery = 'SELECT AttractionID FROM attraction WHERE AName = ?';
        const [attractionResult] = await pool.query(attractionQuery, [attractionName]);

        if (attractionResult.length > 0) {
          const attractionID = attractionResult[0].AttractionID;
          const jointQuery = 'INSERT INTO attraction_joint (AttractionID, TicketID) VALUES (?, ?)';
          await pool.query(jointQuery, [attractionID, ticketID]);
        }
      }
    }
    const { v4: uuidv4 } = require('uuid');
    const today = new Date();
    const formattedDay = today.getDate().toString().padStart(2, '0');
    const orderID = Math.floor(1000 + Math.random() * 9000) + '-' + formattedDay;

    for (const [itemName, itemDetails] of Object.entries(merchItems)) {
      const { item, quantity, size } = itemDetails;
      if (quantity > 0) {
        const { MId: itemID } = item;
        const transactionDate = new Date();

        const merchQuery = `INSERT INTO merchandise_order_detail (ItemID, TotalCost, UserID, TransactionDate, Size, quantity, orderID)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const totalCost = parseFloat(item.sellingCost) * quantity;
        await pool.query(merchQuery, [itemID, totalCost, userID, transactionDate, size, quantity, orderID]);
      }
    }


    for (const [mealKey, mealDetails] of Object.entries(foodTickets)) {
      const { item, qty: quantity } = mealDetails;
      if (quantity > 0) {
        const { id: restaurantID } = item;
        const transactionDate = new Date();

        const foodTicketQuery = `INSERT INTO restaurant_transaction (RestaurantID, UserID, TransactionTimeStamp, quantity)
                                  VALUES (?, ?, ?, ?)`;

        await pool.query(foodTicketQuery, [restaurantID, userID, transactionDate, quantity]);
      }
    }


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Checkout successful' }));
  } catch (error) {
    console.error('Error during checkout:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

function getTicketPrice(ticketType) {
  switch (ticketType) {
    case 'Standard':
      return 65;
    case 'Express':
      return 90;
    case 'Child':
      return 45;
    default:
      throw new Error('Invalid ticket type');
  }
}



module.exports = checkoutHandler;