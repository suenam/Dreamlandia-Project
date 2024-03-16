function getPostData(request) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            request.on('end', () => {
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = getPostData;