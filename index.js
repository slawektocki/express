const express = require('express');
const app = express();

const hbs = require('express-handlebars');

app.use(express.urlencoded({ extended: true }))
app.use( express.static('public'));

app.engine('hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


const Post = require('./app/models/Post');

const post = require('./app/controllers/post.controller')

app.get('/', function(req, res){
    res.render('home', {
        title: 'Tytuł z Express',
        content: 'Cześć programisto'
    });
 

});

app.get('/blog', function(req, res){
    post.list(function(err, posts){
        if(err) res.send(err);
        res.render('blog', {posts});
    });
});


app.get('/blog/:id', function(req, res){
   
    post.get(req.params.id, function(err, post){
        if(err) res.send(err);

        res.render('blog', post);
    })
});



app.get('/blog/post/add', function(req, res){
    res.render('add_post');
});


app.post('/blog/post/add', function(req, res){

    post.add(req.body, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog')
    })
});

app.get('/blog/post/update/:id', function(req, res){

    post.get(req.params.id, function(err, post){
        if(err) res.send(err);

        res.render('update_post', post);
    });
    
});

app.post('/blog/post/update/:id', function(req, res){
    
    post.update(req.params.id, req.body, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog');
    });
    
})

app.get('/blog/post/delete/:id', function(req, res){
    
    post.delete(req.params.id, function(err, post){
        if(err) res.send(err);

        res.redirect('/blog');
    });
    
});


app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});