const http = require('http');
const server = http.createServer((req, res) => {
    console.log('HTTP works!');
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404</h1>');
    res.end()
}).listen(8080);