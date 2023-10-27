const User = require('../models/User');
const bcrypt = require("bcrypt");

async function userAdd(data, cb) {
    try{
        let newUser = new User(data);
        await newUser.save();
         cb(null, newUser);
    
    } catch(err){
        cb(err);
    }
}


async function userLogin(data, cb) {
    
    const user = await User.findOne({username: data.username}).exec();
    
    if(!user){
        cb(null, user);
        return;
    }

    bcrypt.compare(data.password, user.password, function(err, logged) {
        if (err) {
            cb(err);
        } if (logged) {
            const token = user.generateAuthToken();
            cb(null, token);
        } else {
            cb(null, null);
        }
    })
}





module.exports = {
    add: userAdd,
    login: userLogin
}