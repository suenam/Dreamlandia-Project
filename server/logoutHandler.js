function logoutHandler(req, res) {
    // res.setHeader('Set-Cookie', 'token=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieAttributes = [
        'token=',
        'HttpOnly',
        'Path=/',
        isProduction ? 'Secure' : '',
        isProduction ? 'SameSite=None' : '',
        'Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ].filter(Boolean).join('; ');
    res.setHeader('Set-Cookie', cookieAttributes);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Logout successful' }));
}

module.exports = logoutHandler;