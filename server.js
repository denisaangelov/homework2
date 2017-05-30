const http = require('http');
const url = require('url');
const fs = require('fs');
const Post = require('./model');
const Service = require('./service');

const hostname = 'localhost';
const port = 3002;
const service = new Service('posts.json');

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;

    console.log(`Path: ${pathname}`);
    console.log(`Method: ${req.method}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    if (req.method === 'GET') {
        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length > 1 && path[0] === 'api') {
            if (path[1] === 'posts') {
                service.findAll((err, posts) => {
                    if (err) {
                        // 500: File not found
                        console.error(`Error reading file: ${err.message}`);
                        res.writeHead(500, { 'Content-Type': 'text/html' }); //TODO set appropriate MIME type
                        res.write(`
                            <html>
                                <body>
                                    <p>Sorry DB file not found</p>
                                </body>
                            </html>
                        `);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(posts));
                    }
                });
            }
        } else {

            if (resource === '') {
                resource = 'index.html';
            }

            resource = process.cwd() + '/dist/' + resource;

            fs.readFile(resource, (err, data) => {
                if (err) {
                    // 404: File not found
                    console.error(`Error reading file: ${err.message}`, resource);
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //TODO set appropriate MIME type
                    res.write(`
                    <html>
                        <body>
                            <p>Sorry file '${resource}' not found</p>
                        </body>
                    </html>
                `);
                } else {
                    // 200: OK
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data.toString());
                }

                res.end();
            });
        }
    } else if (req.method === 'POST') {
        let headers = req.headers;
        let method = req.method;
        let rUrl = req.url;
        let body = [];


        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length > 1 && path[0] === 'api') {
            if (path[1] === 'posts') {
                //Handle req events: data, end, error
                req.on('error', function (err) {
                    console.error(err);
                }).on('data', function (chunk) {
                    body.push(chunk);
                }).on('end', function () {
                    body = Buffer.concat(body).toString();
                    // at this point, `body` has the entire req body stored in it as a string

                    console.log('Body:', body);
                    const newPost = JSON.parse(body);
                    console.log('After parse:', newPost);

                    res.on('error', function (err) {
                        console.error(err);
                    });

                    service.add(newPost, (err, posts, newPost) => {
                        res.writeHead(201, { 'Content-Type': 'application/json', 'Location': `http://localhost1:${port}/posts/${newPost.id}` });
                        res.end(JSON.stringify(posts));
                    });
                });
            }
        }
    } else if (req.method === 'DELETE') {
        let headers = req.headers;
        let method = req.method;
        let rUrl = req.url;
        let body = [];

        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length === 3 && path[0] === 'api' && path[1] === 'posts') {
            const postId = path[path.length - 1];
            console.log('PostId to be deleted:', postId);
            res.on('error', function (err) {
                console.error(err);
            });

            // delete post by id
            service.delete(postId, (err, posts, newPost) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(posts));
            });
        }
    } else {
        //Handle req events: data, end, error
        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire req body stored in it as a string
            console.log(body);

            //Start emiting res
            //Handle res errors
            res.on('error', function (err) {
                console.error(err);
            });

            // Retun res - 201 : Created
            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            res.writeHead(201, {
                'content-type': 'application/json',
                'location': `http://127.0.0.1:${port}/echo`
            });

            var resBody = {
                headers: headers,
                method: method,
                url: rUrl,
                body: body
            };

            res.write(JSON.stringify(resBody));
            res.end();
        });
    }

});
server.listen(port, hostname, (err) => {
    if (err) console.error(err);
    console.log(`Server running at http://${hostname}:${port}/`);
});