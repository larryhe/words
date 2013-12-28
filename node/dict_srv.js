var express = require('express');
var util = require('./util');
var app = express();
app.use(express.bodyParser());
app.use(express.basicAuth(function(user, pass){
  return util.authenticate(user, pass);
}));

function helper(req){
    return {
        word: req.param('word'),
        phonetic: req.param('phonetic') || '',
        tag: req.param('tag') || 'NEW',
        explains: req.param('explains') || []
    };
}

app.post('/node/add', function(req, res) {
    var dict = req.param('dict');
    util.addWord(dict, helper(req));
    res.status(200).send('success');
});

app.post('/node/update', function(req, res) {
    util.editWord(req.param('dict'),helper(req));
    res.status(200).send('success');
});

app.get('/node/dicts', function(req, res) {
    res.send(util.dicts());
});
app.listen(9898);
