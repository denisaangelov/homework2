const fs = require('fs');

module.exports = class PostService {
    constructor(filename) {
        this.filename = filename;
    }

    findAll(callback) {
        fs.readFile(this.filename, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    }

    findPost(postId, callback) {
        fs.readFile(this.filename, function (err, data) {
            if (err) {
                callback(err);
            } else {
                const jsonData = JSON.parse(data);
                const post = jsonData.filter((p) => { return p.id == postId });
                callback(null, post.length ? post[0] : null);
            }
        });
    }

    add(newPost, callback) {
        let err = this.validate(newPost);
        if (err)
            callback(err, null, newPost);
        else {
            fs.readFile(this.filename, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    newPost.id = Date.now();
                    var posts = JSON.parse(data);
                    posts.push(newPost);
                    fs.writeFile(this.filename, JSON.stringify(posts, null, 4), function (err) {
                        if (err) {
                            throw err;
                        } else {
                            callback(null, posts, newPost);
                        }
                    });
                }
            });
        }
    }

    delete(postId, callback) {
        fs.readFile(this.filename, (err, data) => {
            if (err) {
                callback(err);
            } else {
                let posts = JSON.parse(data);
                let deleted;
                posts = posts.filter((post, index) => {
                    if (post.id == postId) {
                        deleted = post;
                        return false;
                    } else
                        return true;
                });

                console.log('TO BE DELETED !!!', postId, deleted);

                if (!deleted)
                    callback(Object.assign({}, {
                        error: new Error(`Post with id=${postId} does not exist.`),
                        code: 404
                    }), posts);
                else {
                    fs.writeFile(this.filename, JSON.stringify(posts, null, 4), function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, posts, deleted);
                        }
                    });
                }
            }
        });
    }

    update(updated, callback) {
        fs.readFile(this.filename, (err, data) => {
            if (err)
                callback(err);
            else {
                let postId = updated.id;
                let posts = JSON.parse(data);
                let isFound = false;
                posts = posts.map((post, index) => {
                    if (post.id == postId) {
                        isFound = true;
                        return updated;
                    } else {
                        return post;
                    }
                });

                if (!isFound) {
                    callback({
                        error: new Error(`Post with id=${postId} does not exist.`),
                        code: 404
                    }, posts);
                } else {
                    let err = this.validate(updated);
                    if (err)
                        callback(err, null, updated);

                    console.log('TO BE UPDATED !!!', postId, updated);
                    fs.writeFile(this.filename, JSON.stringify(posts, null, 4), function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, posts, updated);
                        }
                    });
                }
            }
        });
    }

    validate(post) {
        let result;
        let key = '';

        let isEmpty = false;
        let object = Object.assign({}, post);
        delete object['id'];

        for (let k in object) {
            if (object[k] === '') {
                isEmpty = true;
                key = k;
                break;
            }
        }
        if (isEmpty) {
            return {
                error: new Error(`Ivalid '${key}' field`),
                code: 442
            };
        }

        return null;
    }
}

