var express = require("express");
var router = express.Router();
var fs = require('fs');
var config = require('config');
var path = require('path');


router.get("/appetizer", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/appetizer.json', 'utf8').trim();
    var users = JSON.parse(json);

    res.end(JSON.parse(json));
});

module.exports = router;
