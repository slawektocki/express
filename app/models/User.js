const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true})
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.pre('save', function(next) {
    let user = this;
     
    if(!user.isModified('password')) return next()
 
    bcrypt.genSalt(Number(process.env.SALT), function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
 
            user.password = hash;
            next();
        });
    })
});


schema.methods.generateAuthToken = function() {
 
    const token = jwt.sign({ _id:this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return token;
}
 
module.exports = mongoose.model('User', schema);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);