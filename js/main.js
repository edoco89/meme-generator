
var gCanvas;
var gCtx;
var gMouseX;
var gMouseY;
var gStartX;
var gStartY;
var gSelectedTextIdx = -1;
var gSelectedText;
var gCurrentInput;


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
    gCurrentInput = meme.txts[0];
}

function handleCanvasClick(ev) {
    setInitialCoords(ev.offsetX, ev.offsetY);
    setLastTimestamp(ev.timeStamp);
}

function drawCanvas() {
    var meme = getMeme();
    meme.selectedImg.onload();
    meme.txts.forEach(text => {
        text.width = gCtx.measureText(text.text).width;
        text.height = text.size;
        gCtx.strokeStyle = text.stroke;
        gCtx.fillStyle = text.color;
        gCtx.textAlign = text.align;
        gCtx.font = `${text.size}px Arial`;
        gCtx.fillText(text.text, text.x, text.y);
        gCtx.strokeText(text.text, text.x, text.y);
    });
    var emojis = getEmojis();
    if (emojis) onEmojiAdd(emojis);
}

function onSetTxt(txt) {
    setText(gCurrentInput.id, txt);
    drawCanvas();
}

function onEmojiAdd(emojis) {
    emojis.forEach(emoji => {
        gCtx.beginPath();
        gCtx.font = "30px Arial";
        gCtx.fillText(emoji.emoji, emoji.x, emoji.y);
        gCtx.stroke();
    });
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

function onAddText(){
    createMeme();
    var meme = getMeme();
    gCurrentInput = meme.txts[getInputTxtCount() - 1];
    console.log(gCurrentInput);
    document.querySelector('.input-txt-editor').value = '';
}

//gallery
function onFilter(val) {
    // debugger;
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


function onImgClick(urlImg) {
    if(urlImg === 'meme-imgs/upload-image.jpg'){
        // document.querySelector('#upload-input').type = "file";
        document.querySelector('#upload-input').click();
    }else{
        imageToCanvas(urlImg);
        document.querySelector('.gallery-container').classList.add('hide');
        document.querySelector('.editor-container').classList.remove('hide');
    }
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
// function renderGallery(imgs) {
//     var strHTML = imgs.map(img => {
//         return `<img onclick="onImgClick('${img.url}')" class="img-gallery" src="${img.url}">`
//     }, []);
//     document.querySelector('.gallery').innerHTML = strHTML.join('');
// }

function renderGallery(imgs) {
    var strHTML = imgs.map(img => {
        return `<div onclick="onImgClick('${img.url}')" class="container">
                    <img src="${img.url}" alt="Avatar" class="image img-gallery" style="width:100%">
                    <div class="middle">
                    </div>
                </div>`
    }, []);
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}



function onGalleryClick() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}


function onAbout(){
    document.querySelector('.contact-modal').classList.toggle('hide');
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
    var emojis = getEmojis();
    onEmojiAdd(emojis);
}

function onTxtColor(color) {
    setTxtColor(gCurrentInput.id, color);
    drawCanvas();
}

function onTxtStroke(stroke) {
    setTxtStroke(gCurrentInput.id, stroke);
    drawCanvas();
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


function onTxtAlign(align) {
    setTxtPosX(stroke.id, align);
    drawCanvas();
}

function setInitialCoords(x, y) {
    gPosX = x;
    gPosY = y;
}

function handleMouseDown(ev) {
    gStartX = parseInt(ev.clientX - gCanvas.offsetLeft);
    gStartY = parseInt(ev.clientY - gCanvas.offsetTop);
    var texts = getMeme().txts;
    for (var i = 0; i < texts.length; i++) {
        if (textHitTest(texts[i], gStartX, gStartY)) {
            gSelectedText = texts[i].text;
            gSelectedTextIdx = i;
            break;
        } else gSelectedTextIdx = -1;
    }
}

function handleMouseMove(ev) {
    if (ev.which !== 1 || gSelectedTextIdx < 0) { return; }
    gMouseX = parseInt(ev.clientX - gCanvas.offsetLeft);
    gMouseY = parseInt(ev.clientY - gCanvas.offsetTop);
    var dx = gMouseX - gStartX;
    var dy = gMouseY - gStartY;
    gStartX = gMouseX;
    gStartY = gMouseY;
    var texts = getMeme().txts;
    var text = texts[gSelectedTextIdx];
    gCurrentInput = text;
    text.x += dx;
    text.y += dy;
    setTxtCords(text.id, text.x, text.y);
    drawCanvas();
}

function textHitTest(text, x, y) {
    return (x >= text.x &&
        x <= text.x + text.width &&
        y >= text.y - text.height &&
        y <= text.y);
}

function handleMouseUp(ev) {
    gSelectedTextIdx = -1;
}

function handleMouseOut(ev) {
    gSelectedTextIdx = -1;
}