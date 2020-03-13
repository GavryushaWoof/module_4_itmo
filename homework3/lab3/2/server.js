const http = require('http');
const cp = require('child_process');
const child = cp.fork('./child.js');

http.createServer((req, res) => {
    child.send({ //методу send передается объект, который будет передан дочернему процессу
        method: req.method, //свойство хранит http метод присланного запроса
        params: req.url //свойство хранит url присланного запроса
    });
    res.statusCode = 200;
    res.end();
}).listen(8080);