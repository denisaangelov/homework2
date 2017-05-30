const fs = require('fs');

module.exports = class PostService {
    constructor(filename) {
        this.filename = filename;
    }

    findAll(callback) {
        fs.readFile(this.filename, function (err, data) {
            if (err) {
                callback(err);
            }
            callback(null, JSON.parse(data));
        });
    }

    add(newPost, callback) {
        fs.readFile(this.filename, (err, data) => {
            if (err) {
                callback(err);
            }
            newPost.id = Date.now();
            var posts = JSON.parse(data);
            posts.push(newPost);
            fs.writeFile(this.filename, JSON.stringify(posts, null, 4), function (err) {
                if (err) {
                    throw err;
                }
                callback(null, posts, newPost);
            });
        });
    }

    delete(postId, callback) {
        fs.readFile(this.filename, (err, data) => {
            if (err) {
                callback(err);
            }
            let posts = JSON.parse(data);
            let deleted;
            posts = posts.filter((post, index) => {
                if (post.id == postId) {
                    deleted = post;
                    return false;
                } else {
                    return true;
                }
            });

            console.log('TO BE DELETED !!!', postId, deleted);

            if (!deleted) {
                callback(new Error(`Post with id=${postId} does not exist.`), posts);
            } else {
                fs.writeFile(this.filename, JSON.stringify(posts, null, 4), function (err) {
                    if (err) {
                        callback(err);
                    }
                    callback(null, posts, deleted);
                });
            }
        });
    }

    edit(postId, callback) {
        // @todo
    }
}

