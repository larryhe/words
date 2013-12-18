var express = require('express');
var util = require('./util');
var app = express();

app.use(express.basicAuth(function(user, pass){
  return util.authenticate(user, pass);
}));

app.get('/node/add', function(req, res) {
    util.addWord(req.query.dict, req.query.word);
    res.status(200).send('success');
});

app.get('/node/edit', function(req, res) {
    util.editWord(req.query.dict, req.query.word);
    res.status(200).send('success');
});

app.get('/node/tag', function(req, res) {
    res.send('tag');
});

app.listen(9898);
