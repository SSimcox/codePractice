var express = require('express');
var router = express.Router();
var request = require('request');
var stdin = require('../game/stdIn')();

var gen = function(app){

    //compile endpoint
    router.post("/compile/:game", function (req, res) {
        var game = req.params.game;
        if(stdin.hasOwnProperty(game)){
            req.body.stdin = stdin[game];
            request.post(app.compile_server+"compile", {form:req.body}, function(err, resp, body){
                if(!err && resp.statusCode == 200){
                    var result = JSON.parse(body);
                    result.status = "success";
                    res.json(result);
                }else{
                    res.json({status:"failed", err:err});
                }
            })
        }
    });

    router.post("/parrot/:game", function(req, res){
        var game = req.params.game;
        if(stdin.hasOwnProperty(game)){
            req.body.stdin = stdin[game];
            res.json(req.body);
        }
    });

    return router;
};

module.exports = function (app){
    return gen(app);
};