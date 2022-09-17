const HTTP = require('http');
const FS = require('fs');
const URL = require('url');

const server = HTTP.createServer(function (req, res) {

    // http://localhost:5050
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1 style="color:green;">This is Home page</h1>');
        res.write('<p>Load using: <a href="read-file-async">Asynchronous</a> | <a href="read-file-sync">Synchronous</a></p>');
        res.end();
    }

    // HTML file read using Asynchronous system
    // http://localhost:5050/read-file-async
    else if (req.url == '/read-file-async') {
        FS.readFile('ReadFileAsync.html', function (Error, Data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(Data);
            res.end();
        });
    }

    // HTML file read using Synchronous system
    // http://localhost:5050/read-file-sync
    else if (req.url == '/read-file-sync') {
        let myFileData = FS.readFileSync('ReadFileSync.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(myFileData);
        res.end();
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log('Something wrong!');
        res.end();
    }
});

server.listen(5050);
console.log('Server run success.');