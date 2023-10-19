const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/express-blog',  {useNewUrlParser: true, useUnifiedTopology: true});


const schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    created_at: {type: Date, default: Date.now},
    isPublic: {type: Boolean, default: false}
});


module.exports = mongoose.model('Post', schema);