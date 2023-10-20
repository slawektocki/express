const express = require("express");
const router = express.Router();
 
const post = require('../controllers/post.controller');


router.get('/', function(req, res){
    post.list(function(err, posts){
        if(err) res.send(err);
        res.render('blog', {posts});
        
    });
});

router.get('/:id', function(req, res){
   
   post.get(req.params.id, function(err, data_post){
        if(err) res.send(err);

        res.render('blog', data_post);
        console.log(data_post);
    })
});

router.get('/post/add', function(req, res){
    res.render('add_post');
});

router.post('/post/add', function(req, res){

    post.add(req.body, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog')
    })
});

router.get('/post/update/:id', function(req, res){

    post.get(req.params.id, function(err, post){
        if(err) res.send(err);

        res.render('update_post', post);
    });
    
});

router.post('/post/update/:id', function(req, res){
    
    post.update(req.params.id, req.body, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog');
    });
    
})

router.get('/post/delete/:id', function(req, res){
    
    post.delete(req.params.id, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog');
    });
    
});


module.exports = router;