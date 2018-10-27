
// ***** GLOBAL VARIABLE ***** //
var gEmoji = [];
var gEmojiCount = 0;


// Creating new emoji object
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

// Delete emoji
function deletEmoji(emojiId) {
    gEmojiCount--;
    var emojiIdx = gEmoji.findIndex(emoji => {
        return emoji.id === emojiId
    })
    gEmoji.splice(emojiIdx, 1);
}

// Return emoji by id
function getEmojiById(emojiId) {
    return gEmoji.find(emoji => {
        return emoji.id === emojiId;
    });
}

// Return all the current emojis
function getEmojis() {
    return gEmoji;
}

// Setting emoji (x, y) cords
function setEmojiCords(emojiId, x, y) {
    var emoji = getEmojiById(emojiId);
    emoji.x = x;
    emoji.y = y;
}

// Setting emoji size
function setEmojiSize(emojiId, size) {
    var emoji = getEmojiById(emojiId);
    emoji.size = size;
}

// Return the numbe pf the current emojis
function getEmojisCount() {
    return gEmojiCount;
}

// Init the emoji count to 0
function initEmojisCount() {
    gEmojiCount = 0;
}
