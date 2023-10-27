const express = require("express");
const router = express.Router();
 
const post = require('../controllers/post.controller');
const auth = require("../middlewares/auth");

router.get('/all', function(req, res){
    post.list(function(err, posts){
        if(err) {
            res.status(404);
            res.json({
                error: "Posts not found"
            });
        } else {
            res.json(posts);
        }
    });
});

router.get('/:id', function(req, res){
   
   post.get(req.params.id, function(err, data_post){
        if(err) {
            res.status(404);
            res.json({
                error: "Posts not found"
            });
        } else {
            
            res.json(data_post);
        }
    });
});

router.post('/add', auth, function(req, res){

    post.add(req.body, function(err, post){
        if(err) {
            res.status(404);
            res.json({
                error: "Posts not created"
            });
        } else {
            
            res.json(post);
        }
    });
});

router.put('/update/:id', function(req, res){
    
    post.update(req.params.id, req.body, function(err, post){
        if(err) {
            res.status(404);
            res.json({
                error: "Posts not found"
            });
        } else {
            
            res.json(post);
        }
    });
    
})

router.delete('/delete/:id', function(req, res){
    
    post.delete(req.params.id, function(err, data){
        if(err) {
            res.status(404);
            res.json({
                error: "Posts not found"
            });
        } else {
            
            res.json(data);
        }
    });
    
});


module.exports = router;