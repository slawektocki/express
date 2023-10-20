const mongoose = require("mongoose");


mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true})



const schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    created_at: {type: Date, default: Date.now},
    isPublic: {type: Boolean, default: false}
});


module.exports = mongoose.model('Post', schema);