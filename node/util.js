var fs = require('fs');
var md5 = require('MD5');
var _ = require('underscore');
var BASE_DIR = process.argv[2] || '../dict/';
function _passwdEntry (username, pass) {
    return username + ":" + md5(pass);
}

function _dict (dname) {
    return BASE_DIR + dname;
}

function _wordEntry (word) {
    var a = [];
    a.push(word.word);
    a.push(' [' + word.phonetic + ']');
    if(word.explains && word.explains.length > 0){
        _.each(word.explains, function(item){
            a.push(' [' + item + ']');
        });
    }
    if(word.tag){
        a.push(' ' + word.tag);
    }
    return a.join('');
}

function authenticate (username, pass) {
    var ret = false,
        all =  fs.readFileSync(__dirname + '/passwd', 'utf8').split('\n');
      for (var i = 0; i < all.length; i++) {
          if(all[i] == _passwdEntry(username, pass)){
              ret = true;
              break;
          }
      };
    return ret;
}

function addWord (dict, word) {
    var dict = _dict(dict);
    fs.appendFileSync(dict, '\n'+_wordEntry(word), 'utf8');
}

function editWord (dict, word) {
    var dict = _dict(dict);
    var lines =  fs.readFileSync(dict, 'utf8').split('\n');
    var start = new RegExp('^' + word.word + '\b*.*');
    for(var i=0; i < lines.length; i++){
        if(start.test(lines[i])){
            lines[i] = _wordEntry(word);
        }
    }
    fs.writeFileSync(dict, lines.join('\n'));
}

function listDicts () {
    var files = fs.readdirSync(BASE_DIR);
    return files;
}

module.exports.authenticate = authenticate;
module.exports.addWord = addWord;
module.exports.editWord = editWord;
module.exports.dicts = listDicts;
