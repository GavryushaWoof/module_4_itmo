const http = require('http');
const fs = require('fs');

const filename = ["header.html", "body.html", "footer.html"];

function promisifyReadFile(file) {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}

http.createServer((request, response) => {
    let promises = filename.map(promisifyReadFile);
    Promise
        .all(promises)
        .then((arr) => {
            console.log(`The files are read and sent to the client\n`);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(arr.join(''))
        })
        .catch((err) => {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        });
    console.log("Request accepted!");
}).listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
});