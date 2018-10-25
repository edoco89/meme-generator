
var gEmoji = [];
var gEmojiCount = 0;


function createEmoji(emoji) {
    gEmojiCount++;
    gEmoji.push(
        {
            id: gEmojiCount,
            emoji,
            size: 40,
            x: 10,
            y: 50
        }
    );
}

function deletEmoji(emojiId) {
    gEmojiCount--;
    var emojiIdx = gEmoji.findIndex(emoji => {
        return emoji.id === emojiId
    })
    gEmoji.splice(emojiIdx, 1);
}

function getEmojiById(emojiId) {
    return gEmoji.find(emoji => {
        return emoji.id === emojiId;
    });
}

function getEmojis() {
    return gEmoji;
}

function setEmojiCords(emojiId, x, y) {
    var emoji = getEmojiById(emojiId);
    emoji.x = x;
    emoji.y = y;
}

function setEmojiSize(emojiId, size) {
    var emoji = getEmojiById(emojiId);
    emoji.size = size;
}