
var gImgs;
var countImages = 0;

var gKeywords = {
    'fun': { count: 0, ids: [] },
    happy: { count: 1, ids: [] },
    sad: { count: 0, ids: [] },
}

function getGallery() {
    return gImgs;
}
function getKeywords(){
    return gKeywords;
}


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
    ]
}

function createImage(url, keywords) {
    var id = makeId();
    inputKeyWord(keywords, id);
    return {
        id,
        url,
        keywords
    }
}



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




function inputKeyWord(keysToFind, id) {
    keysToFind.forEach(keyToFind => {
        if (gKeywords[keyToFind]) {
            gKeywords[keyToFind].ids.push(id);
        } else {
            gKeywords[keyToFind] = { count: 0, ids: [id] };
        }
    });
}

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
