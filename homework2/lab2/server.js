let http = require('http'); // подключение модуля для работы с http
let fs = require('fs'); // подключение модуля для работы с файлом
let path = require('path'); // подключение модуля для работы с путями в файловой системе

let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    //'.ico': '/vnd.microsoft.icon'
    '.ico': '/x-icon'
};

http.createServer((request, response) => {
    let pathname, extname, mimeType;
    console.log("Request: " + request.url);

    if (request.url === '/')
        pathname = 'site/index.html';
    else
        pathname = 'site' + request.url;

    extname = path.extname(pathname);
    mimeType = mimeTypes[extname];

    switch (extname) {
        case ".jpg":
        case ".gif":
        case ".ico":
            return handlePic(pathname, mimeType, response);
        default:
            return handleFile(pathname, mimeType, response);
    }
}).listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
});

function handlePic(pathname, mimeType, response) {
    try {
        let img = fs.readFileSync(pathname);
        console.log(`The file ${pathname} is read and sent to the client\n`);
        response.writeHead(200, { 'Content-Type': mimeType });
        response.end(img);
    } catch (e) {
        console.log('Could not find or open file for reading\n');
        response.statusCode = 404;
        response.end();
    }
}

function handleFile(pathname, mimeType, response) {
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, { 'Content-Type': mimeType });
            response.end(data);
        }
    });
}