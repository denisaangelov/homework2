module.exports = class Post {
    constructor(id, text) {
        this.id = id;
        this.title = '';
        this.author = '';
        this.text = text;
        this.tags = '';
        this.status = 'Active';
        this.date = new Date();
    }
}