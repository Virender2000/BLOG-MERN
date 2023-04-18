const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


const User = require('./models/user');
const Post = require('./models/Post');


const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const multer = require('multer');
// Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files
const uploadmiddleware = multer({ dest: 'uploads/' })

const fs = require('fs');
const salt = bcrypt.genSaltSync(10);
const secret = "ssjkfjhsbvsdkl";
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb+srv://vicky:ramnagar@cluster0.yqdgiiy.mongodb.net/?retryWrites=true&w=majority');


app.use('/uploads', express.static(__dirname + '/uploads'))


//Registering a new user
app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    try {
        // adding the new user info into mongo DB
        const userdoc = await User.create({
            username,
            // here we use bcrypt to encrytp the password 
            password: bcrypt.hashSync(password, salt),
        });
        // sending the response as userdoc 
        res.json(userdoc);
    }
    catch (e) {
        res.status(400).json(e);
    }
    res.json('test ok');
});

// checking the user credentials and logging in the user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //checking wether user is present in DB or not
    const userdoc = await User.findOne({ username })

    //if the user credentials are matched then we'll respond with json web-token
    if (bcrypt.compareSync(password, userdoc.password)) {
        //creating the web token so that it can be authenticated in future. You send your JWT to the server with each request. When the server receives it, it generates a signature using using some data from your JWT, verifies it, and if your JWT is valid, it sends back a response
        jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userdoc._id,
                username,
            });
            // console.log("inside token");
        });
    }
    else {
        res.status(400).json("wrong credentials");
    }
});


//checking if the user has logged in 
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    //verifying the cookie info stored inside client app with JWT in the server side
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

// for getting all the post info present inside mongodb
app.get('/post', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

//uploading post to the database
app.post('/post', uploadmiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            username: info.username,
            author: info.id,
        });
        res.json(postDoc);
    });

});



app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
});


//for updating/ editing the post
app.put('/post', uploadmiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });

});

app.listen(4000);
