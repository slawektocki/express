const express = require('express');
const app = express();
require('dotenv').config();
const hbs = require('express-handlebars');

const blogRouter = require('./app/routes/blogRouter');
const postApiRouter = require('./app/api/postApi');
const userApiRouter = require('./app/api/userApi');

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use( express.static('public'));

app.engine('hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

/* Routes */
app.use('/blog',blogRouter);

/* Api routes */
app.use('/api/post', postApiRouter);
app.use('/api/user', userApiRouter);

app.listen(process.env.PORT, function(){
    console.log('Serwer Node.js działa');
});