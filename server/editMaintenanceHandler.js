// Within the editMaintenanceHandler.js

const pool = require('./database');
const getPostData = require('./postDataParser');

async function editMaintenanceHandler(req, res) {
    try {
        const { MRSubject, MRDescription, MRCost, MRStatus, MRDateResolved, RequestID } = await getPostData(req);
        let query = 'UPDATE maintenance_request SET MRSubject = ?, MRDescription = ?, MRCost = ?, MRStatus = ?';
        let values = [MRSubject, MRDescription, MRCost, MRStatus];

        if (MRStatus === 'Completed' && MRDateResolved) {
            query += ', MRDateResolved = ?';
            values.push(MRDateResolved);
        }

        query += ' WHERE RequestID = ?';
        values.push(RequestID);

        await pool.execute(query, values);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Maintenance request updated successfully' }));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating maintenance request', error: error.toString() }));
    }
}

module.exports = editMaintenanceHandler;
