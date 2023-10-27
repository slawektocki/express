const Post = require('../models/Post');

async function postList(cb) {
    try{
        const posts = await Post.find().lean().exec();
        cb(null, posts);
    }
    catch(err){
        cb(err);
    }
}

async function postGet(id, cb) {
    try{
        const data = await Post.findById(id).exec(); 
        cb(null, data);
    }catch(err) {
        cb(err)
    }
}

async function postAdd(data, cb) {
    try{
        let newPost = new Post(data);
        await newPost.save();
        cb (null, newPost);
    }catch (err)
        { 
            cb(err);
        }
}

async function postUpdate(id, data, cb) {
    try{
        const post = await Post.updateOne({_id: id}, data);
        cb(null, post);
    } catch(err) {
        cb(err);
    }
}

async function postDelete(id, cb) {
    try{
        await Post.deleteOne({_id: id});
        cb(null);
    } catch(err){
        cb(err);
    }
}


module.exports = {
    list: postList,
    get: postGet,
    add: postAdd,
    update: postUpdate,
    delete: postDelete
}