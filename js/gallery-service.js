
var gImgs;
var countImages = 0;
var gKeywords = {
    fun: [],
    happy: [],
    sad: [],
}

function getGallery() {
    return gImgs;
}


function createGallery() {
    gImgs = [
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
    countImages++;
    inputKeyWord(keywords, countImages);
    return {
        id: countImages,
        url,
        keywords
    }
}

function createKeyword(...keywords) {
    return [...keywords];
}

function searchKey(keyToFind) {
    for (key in gKeywords) {
        if (key === keyToFind) {
            // console.log(gKeywords[key])
            return getImagesByids(gKeywords[key]);
        }
    }
}
function inputKeyWord(keysToFind, id) {
    // debugger;
    keysToFind.forEach(keyToFind => {
        if (gKeywords[keyToFind]) {
            gKeywords[keyToFind].push(id);
        } else {
            gKeywords[keyToFind] = [id]
        }
    });
}

function getImagesByids(ids) {
    var filterImgs = ids.map(id => {
        for(let i = 0; i < gImgs.length; i++){
            if(gImgs[i].id === id){
                return gImgs[i];
            }
        }
    }, [])
    // console.log(filterImgs)
    return filterImgs;
}
