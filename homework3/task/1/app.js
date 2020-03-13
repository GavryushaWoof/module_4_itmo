let http = require('http');
let fs = require('fs');

http.createServer((request, response) => {
    console.log("Request: " + request.url);
    let name;
    if (request.url === '/') {
        name = 'index.html'
    } else {
        name = request.url.replace('/', '')
    }
    fs.readFile(name, 'utf8', (err, data) => {
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