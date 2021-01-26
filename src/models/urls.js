const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlsSchema = new Schema({
    longUrl: {
        type: String,
        index: true
    },
    shortUrl: {
        type: String,
        index: true
    },
    visits: {
        type: Number,
        default: 0
    },
    id: {
        type: String,
        index: true
    },
    from: Array
});


module.exports = mongoose.model("urls", urlsSchema);