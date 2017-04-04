var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://surya:surya@ds149700.mlab.com:49700/hyrtimesheet',['users']);

router.get('/users', function(req, res, next){
    db.users.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

router.put('/checkuser', function(req, res, next){
    var user = req.body;
    
    db.users.findOne({email:user.email, password:user.password},function(err, user){
        if(err){
            res.send(err);
            console.log(err);
        }
        
        res.json(user);
    });

});

module.exports = router;