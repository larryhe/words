var express = require('express');
var util = require('./util');
var app = express();
app.use(express.bodyParser());
app.use(express.basicAuth(function(user, pass){
  return util.authenticate(user, pass);
}));

app.post('/node/add', function(req, res) {
    var dict = req.param('dict');
    var word = {
        word: req.param('word'),
        phonetic: req.param('phonetic') || '',
        tag: req.param('tag') || 'NEW',
        explains: req.param('explains') || []
    };
    util.addWord(dict, word);
    res.status(200).send('success');
});

app.get('/node/edit', function(req, res) {
    util.editWord(req.query.dict, req.query.word);
    res.status(200).send('success');
});

app.get('/node/tag', function(req, res) {
    res.send('tag');
});

app.get('/node/dicts', function(req, res) {
    res.send(util.dicts());
});
app.listen(9898);
