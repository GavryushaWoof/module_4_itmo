const http = require('http');
const fs = require('fs');
const filename = "index.html"

http.createServer((request, response) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(data);
        }
    });
}).listen(8080);