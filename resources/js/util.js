define([ 'jquery', 'underscore' ], 
        function($, _){

            function splitWords(text){
                var lines,
                    words = [];
                lines = text.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    if(lines[i]){
                        words.push(parseLine(lines[i]));
                    }
                };
                return words;
            }

            function parseLine(line){
                var word = {},
                    idx = 0,
                    section,
                    items,
                    item,
                    left;
                if(line && line.indexOf('[') > 0){
                    word.word = $.trim(line.substring(0, line.indexOf('[')));
                    left = line.substring(line.indexOf('['));
                    while(left.indexOf(']') > 0){
                        end = left.indexOf(']');
                        section = left.substring(left.indexOf('[') + 1 , end);
                        section = $.trim(section);
                        left = left.substring(end + 1);
                        if(idx == 0){
                            word.phonetic = section ? ('[' + section + ']') : '';
                        }else{
                            word.explains = word.explains || [];
                            word.explains.push(section);
                        }
                        idx ++;
                    }
                    word.tag = $.trim(left) || 'NEW';
                }else{
                    word.word = line;
                }
                return word;
            }

            return { splitWords: splitWords};
        }
);
