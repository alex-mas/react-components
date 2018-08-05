

export const capitalizeFirst = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
const punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

//borrowed from a stackoverflow post, forgot the link
export const titleCase = function(title){
    var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;
    
    while (true) {
        var m = split.exec(title);

        parts.push( title.substring(index, m ? m.index : title.length)
            .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
                return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : capitalizeFirst(all);
            })
            .replace(RegExp("\\b" + small + "\\b", "ig"), (word)=>word.toLowerCase())
            .replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
                return punct + capitalizeFirst(word);
            })
            .replace(RegExp("\\b" + small + punct + "$", "ig"), capitalizeFirst));
        
        index = split.lastIndex;
        
        if ( m ) parts.push( m[0] );
        else break;
    }
    
    return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
        .replace(/(['Õ])S\b/ig, "$1s")
        .replace(/\b(AT&T|Q&A)\b/ig, function(all){
            return all.toUpperCase();
        });
};