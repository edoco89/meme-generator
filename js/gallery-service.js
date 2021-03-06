
// ***** GLOBAL VARIABLE ***** //
var gImgs;
var countImages = 0;
var gKeywords = {
    'fun': { count: 0, ids: [] },
    happy: { count: 1, ids: [] },
    sad: { count: 0, ids: [] },
}


// Return the gallery
function getGallery() {
    return gImgs;
}

// Return the keywords
function getKeywords(){
    return gKeywords;
}

// Creating the gallery
function createGallery() {
    gImgs = [
        createImage('meme-imgs/upload-image.jpg', []),
        createImage('meme-imgs/1.jpg', ['happy', 'fun']),
        createImage('meme-imgs/2.jpg', ['happy']),
        createImage('meme-imgs/3.jpg', ['sad']),
        createImage('meme-imgs/4.jpg', ['koko']),
        createImage('meme-imgs/5.jpg', ['pop']),
        createImage('meme-imgs/6.jpg', ['lolo']),
        createImage('meme-imgs/7.jpg', ['sad']),
        createImage('meme-imgs/8.jpg', ['p']),
        createImage('meme-imgs/9.jpg', ['happy']),
        createImage('meme-imgs/10.jpg', ['happy', 'fun']),
        createImage('meme-imgs/11.jpg', ['happy']),
        createImage('meme-imgs/12.jpg', ['sad']),
        createImage('meme-imgs/13.jpg', ['koko']),
        createImage('meme-imgs/14.jpg', ['pop']),
        createImage('meme-imgs/15.jpg', ['lolo']),
        createImage('meme-imgs/16.jpg', ['sad']),
        createImage('meme-imgs/17.jpg', ['p']),
        createImage('meme-imgs/18.jpg', ['happy']),
        createImage('meme-imgs/19.jpg', ['happy', 'fun']),
        createImage('meme-imgs/20.jpg', ['happy']),
        createImage('meme-imgs/21.jpg', ['sad']),
        createImage('meme-imgs/22.jpg', ['koko']),
        createImage('meme-imgs/23.jpg', ['pop']),
        createImage('meme-imgs/24.jpg', ['lolo']),
        createImage('meme-imgs/25.jpg', ['sad']),
    ]
}

// Create new image the user upload
function createImage(url, keywords) {
    var id = makeId();
    inputKeyWord(keywords, id);
    return {
        id,
        url,
        keywords
    }
}

// Searching for a keyword the user type/choose
function searchKey(keyToFind) {
    var allImgs = [];
    for(var key in gKeywords){
        if(key.includes(keyToFind)){
            gKeywords[key].count++;
            var currImgs = getImagesByids(gKeywords[key].ids)
            currImgs.forEach(curr => {
                allImgs.push(curr);
            })
        }
    }
    return allImgs;
}

// Create new input if the user submit new key word
// else, adding to the keyword count +1
function inputKeyWord(keysToFind, id) {
    keysToFind.forEach(keyToFind => {
        if (gKeywords[keyToFind]) {
            gKeywords[keyToFind].ids.push(id);
        } else {
            gKeywords[keyToFind] = { count: 0, ids: [id] };
        }
    });
}

// Return image by id
function getImagesByids(ids) {
    var filterImgs = ids.map(id => {
        for (let i = 0; i < gImgs.length; i++) {
            if (gImgs[i].id === id) {
                return gImgs[i];
            }
        }
    }, [])
    return filterImgs;
}
