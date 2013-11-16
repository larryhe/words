define([ 'jQuery', 'Underscore' ], 
        function($, _){

            var dicts = [
                        {name: 'Advanced Words', path: '/dict/advanced-words.txt'},
                        {name: 'Daily Words', path: '/dict/daily-words.txt'}
                ];

            function splitWords(text){
                var lines,
                    words = [];
                lines = text.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    words.push(parseLine(lines[i]));
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
                    word.word = line.substring(0, line.indexOf('['));
                    left = line.substirng(line.indexOf('['));
                    while(left.indexOf(']') > 0){
                        end = left.indexOf(']');
                        section = left.substring(left.indexOf('[') + 1 , end);
                        section = $.trim(section);
                        left = left.substring(end + 1);
                        if(idx == 0){
                            word.phonetic = section;
                        }else{
                            word.explains = word.explains || [];
                            items = section.split("Example:");
                            item = {};
                            if(items.length > 0){
                                item.mean = items[0];
                                item.example = items[1];
                            }else{
                                item.mean = items[0];
                            }
                            word.explains.push(item);
                        }
                        idx ++;
                    }
                }else{
                    word.word = line;
                }
                return word;
            }

            return { splitWords: splitWords, dicts: dicts};
        }
);
