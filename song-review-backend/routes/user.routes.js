const express = require('express');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { db } = require('../models/user.model');

const router = express.Router();

const upload = multer();


router.get('/', async (req, res) => {
    let users = await User.find();

    res.json(users)
})

router.post('/register', upload.none(), (req, res) => {
    const userData = new User(req.body)
    console.log(userData);

    User.findOne({
        username: req.body.username
    }).then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                User.create(userData).then(user => {
                    res.json({ status: user.username + ' Registered!'});
                })
                .catch(err => {
                    res.send('error ' + err);
                })
            })
        }else{
            res.json({error: 'User already exists'});
        }
    })
    .catch(err => {
        res.send('error ' + err)
    })

})

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    password: user.password,
                    date_created: user.date_created,
                    is_admin: user.is_admin
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 5000
                })
                res.json({token: token});
            }else {
                res.json({error: 'User does not exist'});
            }
        } else {
            res.json({error: 'User does not exist'});
        }
    }).catch(err => {
        res.send('error ' + err)
    })
    
    
})

router.post('/username', (req,res) => {
    User.findOne({
        _id: req.body.id
    }).then(data => {
        res.json(data);
    })
})

router.get('/profile', (req,res) => {
    let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    User.findOne({
        _id: decoded._id
    }).then(user => {
        if(user) {
            res.json(user);
        }else {
            res.send('User does not exist');
        }
    })
    .catch(err => {
        res.send('error ' + err);
    })
});

router.post('/make-admin', (req,res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(user){
            db.collection('users').updateOne({
                username: user.username,
            }, {$set: 
                {
                    is_admin: true
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
        }else{
            res.send('User does not exist');
        }

    })
})

router.post('/remove-admin', (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(user){
            db.collection('users').updateOne({
                username: user.username,
            }, {$set: 
                {
                    is_admin: false
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
        }else{
            res.send('User does not exist');
        }

    })
})

router.delete('/', (req, res) => {
    db.collection('users').remove();
    res.send('users are removed');
})



module.exports = router;