
var gCanvas;
var gCtx;



function init() {
    createGallery();
    renderGallery(getGallery());
    createMemes();
}

function initMeme() {
    gCanvas = document.querySelector('#canvas');
    gCtx = canvas.getContext('2d');
    var meme = getMeme();
    gCanvas.width = meme.selectedImg.width;
    gCanvas.height = meme.selectedImg.height;
    meme.txts.forEach(txt => {
        drawTxt(txt);
    });
}

function handleCanvasClick(ev) {
    setInitialCoords(ev.offsetX, ev.offsetY);
    setLastTimestamp(ev.timeStamp);
}

function drawCanvas(elInput) {
    var meme = getMeme();
    // meme.selectedImg.onload();
    onTextAdd(elInput);
    meme.txts.forEach(txt => {
        drawTxt(txt);
    });
    console.dir(canvas);
    // var emojis = getEmoji();
    // if (emojis) {
    //     onEmojiAdd(emojis);
    // }
}

function drawTxt(txt) {
    var elTxt = document.getElementById(txt.id);
    elTxt.value = txt.text;
    onTextAdd(elTxt);
}

function onTextAdd(elTxt) {
    gCtx.beginPath();
    setText(elTxt.id, elTxt.value);
    var text = getTextById(elTxt.id);
    gCtx.strokeStyle = text.stroke;
    gCtx.fillStyle = text.color;
    gCtx.textAlign = text.align;
    gCtx.font = `${text.size} Arial`;
    gCtx.fillText(text.text, text.x, text.y, gCanvas.width);
    gCtx.strokeText(text.text, text.x, text.y, gCanvas.width);
    gCtx.closePath();
}

function onEmojiAdd(emojis) {
    emojis.forEach(emoji => {
        gCtx.beginPath();
        gCtx.font = "30px Arial";
        gCtx.fillText(emoji.emoji, emoji.x, emoji.y);
        gCtx.stroke();
    });
}

function onTextDone() {
    gCurrentTxtPos++;
    var txtInput = document.getElementById('txt-add');
    txtInput.value = '';

}

function clearCanvas() {
    gCtx = null;
    gCtx = gCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    getImgBackground().onload();
    document.getElementById('txt-top').value = '';
    document.getElementById('txt-bottom').value = '';

}

function saveCanvas(elLink) {
    var imgContent = canvas.toDataURL();
    elLink.href = imgContent;
    elLink.download = 'my-canvas.jpg';
}


//button hamburger toggle
function toggleMenu() {
    document.querySelector('.btn-top-container').classList.toggle('open-btn');
}

//gallery
function onFilter(val) {
    renderKeywords(val);
    if (val) {
        var filterdImages = searchKey(val);
        if (!filterdImages) {
            renderGallery(getGallery());
        } else {
            renderGallery(filterdImages);
        }
    } else {
        renderGallery(getGallery());
    }
}

function renderKeywords(val) {
    if (!val) {
        document.querySelector('.filter-words').innerHTML = '';
    } else {

        var words = getKeywords();

        var wordsKeys = Object.keys(words);
        // console.log(words);
        var strHTML = wordsKeys.map(word => {
            var wordSize = 20;
            if (words[word].count >= 1 && words[word].count < 3) {
                wordSize = 25;
            } else if (words[word].count >= 3 && words[word].count < 6) {
                wordSize = 30;
            } else if (words[word].count >= 6 && words[word].count < 9) {
                wordSize = 35;
            } else if (words[word].count >= 9 && words[word].count < 12) {
                wordSize = 40;
            } else if (words[word].count >= 12) {
                wordSize = 45;
            }
            return `<a style="font-size:${wordSize}px" class="word-link" onclick="onKeyClick('${word}')">${word}</a>`
        }, []);
        document.querySelector('.filter-words').innerHTML = strHTML.join('');
    }
}
function onKeyClick(word) {
    onFilter(word);
}
function renderGallery(imgs) {
    var strHTML = imgs.map(img => {
        return `<img onclick="onImgClick('${img.url}')" class="img-gallery" src="${img.url}">`
    }, []);
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function onImgClick(urlImg) {
    imageToCanvas(urlImg);
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
}


function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            initMeme();
            gCanvas.width = this.width;
            gCanvas.height = this.height;
            gCtx.drawImage(this, 0, 0);
        }
        img.src = event.target.result;
        setImgBackground(img);
    }
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);
}


function imageToCanvas(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height);
    }
    setImgBackground(img);
    initMeme();
}

function onGalleryClick() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}

function onFileInputChange(ev) {
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
    handleImage(ev);
}


// open modal emoji
function onBtnEmoji() {
    document.querySelector('.icons-modal').classList.toggle('hide');
}
function openEmojiModal(ev) {
    document.querySelector('.icons-modal').classList.toggle('hide');
    saveEmojiPos(ev);
}

function onEmojiClick(emoji) {
    document.querySelector('.icons-modal').classList.toggle('hide');
    saveEmoji(emoji);
}


