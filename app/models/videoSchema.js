var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var video = new Schema({
    originalId: String,
    title: String,
    user: String,
    imageURL: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', video);