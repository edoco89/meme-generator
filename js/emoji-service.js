var gEmoji = [];
var currEmojiPos;
var currEmoji;

function saveEmojiPos(ev){
    currEmojiPos = {};
    currEmojiPos.x = ev.offsetX;
    currEmojiPos.y = ev.offsetY;
}


function saveEmoji(emoji){
    currEmoji = emoji;
    if(currEmojiPos){
        gEmoji.push({emoji: currEmoji, x: currEmojiPos.x, y: currEmojiPos.y})
    }
}

function getEmojis(){
    return gEmoji;
}
