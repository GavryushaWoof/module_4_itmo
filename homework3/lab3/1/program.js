const http = require('http');
const fs = require('fs');

let name = '';

if (process.env.LANG) {
    if (process.env.LANG === 'ru_RU') {
        name = 'ru.html';
    } else {
        name = 'en.html';
    }
} else {
    if (process.argv.includes('ru')) {
        name = 'ru.html';
    } else {
        name = 'en.html';
    }
}

http.createServer(function(req, res) {

    fs.readFile(name, 'utf8', function(err, data) {
        if (err) {
            res.statusCode = 404;
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        }
    });
}).listen(8080);