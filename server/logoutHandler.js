function logoutHandler(req, res) {
    // res.setHeader('Set-Cookie', 'token=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Logout successful' }));
}

module.exports = logoutHandler;