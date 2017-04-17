var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://surya:surya@ds149700.mlab.com:49700/hyrtimesheet',[]);

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
    console.log(user);
    db.users.findOne({email:user.email, password:user.password},function(err, user){
        if(err){
            res.send(err);
            console.log(err);
        }
        
        res.json(user);
    });

});

//add timesheets for user
router.put('/updateTimesheets', function(req, res, next){
    var data = req.body;
   
    if(!data){
        res.status(400);
        res.json({
            "error":"bad Data"
        });
    }else{
        db.users.update({_id: mongojs.ObjectId(data.userId)},
                        { $addToSet: { timesheets: { $each:data.timesheets } } },{} , 
                        function(err, resp){
                            if(err){
                                res.send(err);
                            }
                            res.json(resp);
        });
    }
    
});


module.exports = router;