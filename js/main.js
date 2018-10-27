
var gCanvas;
var gCtx;
var gMouseX;
var gMouseY;
var gStartX;
var gStartY;
var gSelectedTextIdx = -1;
var gSelectedText;
var gCurrentInput;
var gCleare = false;
var gRect;


function init() {
    createGallery();
    renderGallery(getGallery());
    createMeme();
    gCanvas = document.querySelector('#canvas');
    gCanvas.addEventListener("touchmove", handleMouseMove, false);
    gCanvas.addEventListener("touchend", handleMouseUp, false);
    gCanvas.addEventListener("touchancelc", handleMouseOut, false);
    gCanvas.addEventListener("touchstart", handleMouseDown, false);
}


function initMeme(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        setImgBackground(img);
        gCtx = canvas.getContext('2d');
        var meme = getMeme();
        var elCanvas = document.querySelector('.canvas-container');
        gCanvas.width = elCanvas.clientWidth;
        var ratio = meme.selectedImg.height / meme.selectedImg.width;
        gCanvas.height = gCanvas.width * ratio;
        gCurrentInput = meme.txts[0];
        drawCanvas();
    }
}


function drawCanvas() {
    var meme = getMeme();
    gCtx.drawImage(meme.selectedImg, 0, 0, gCanvas.width, gCanvas.height);
    meme.txts.forEach(text => {
        text.width = gCtx.measureText(text.text).width;
        text.height = text.size;
        gCtx.strokeStyle = text.stroke;
        gCtx.fillStyle = text.color;
        gCtx.textAlign = text.align;
        gCtx.font = `${text.size}px impact`;
        gCtx.lineWidth = text.strokeSize;
        gCtx.fillText(text.text, text.x, text.y);
        gCtx.strokeText(text.text, text.x, text.y);
    });
    var emojis = getEmojis();
    console.log(emojis);
    emojis.forEach(emoji => {
        emoji.width = gCtx.measureText(emoji.emoji).width;
        emoji.height = emoji.size;
        gCtx.font = `${emoji.size}px Arial`;
        gCtx.fillText(emoji.emoji, emoji.x, emoji.y);
    });
}

function onSetTxt(txt) {
    setText(gCurrentInput.id, txt);
    drawCanvas();
}

function onEmojiAdd(emoji) {
    createEmoji(emoji);
    drawCanvas();
}

function onEmojiDelete() {
    deletEmoji(gCurrentInput.id);
    var meme = getMeme();
    gCurrentInput = meme.txts[0];
    initEditMenu();
    drawCanvas();
}


function clearCanvas() {
    var meme = getMeme();
    meme.txts.forEach(() => {
        onDeleteText();
    });
    var imgBackground = getImgBackground();
    createMeme();
    initInputTxtCount();
    setImgBackground(imgBackground);
    initEditMenu();
    drawCanvas();
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

function onAddText() {
    createText();
    var meme = getMeme();
    gCurrentInput = meme.txts[getInputTxtCount() - 1];
    initEditMenu();
    drawCanvas();
}

function onDeleteText() {
    if (!gCleare) {
        if (getInputTxtCount() > 0) {
            deletText(gCurrentInput.id);
            var meme = getMeme();
            gCurrentInput = meme.txts[0];
            initEditMenu();
            onAddText();
        } else if (getInputTxtCount() <= 0) {
            gCleare = true;
        }
    }
}

function onTextSizeUp() {
    if (gCurrentInput.size < 101) {
        gCurrentInput.size += 5;
        setTxtSize(gCurrentInput.id, gCurrentInput.size);
        drawCanvas();
    }
}

function onTextSizeDown() {
    if (gCurrentInput.size > 9) {
        gCurrentInput.size -= 5;
        setTxtSize(gCurrentInput.id, gCurrentInput.size);
        drawCanvas();
    }
}

function onStrokeSizeUp() {
    if (gCurrentInput.strokeSize < 10) {
        gCurrentInput.strokeSize += 0.5;
        setStrokeSize(gCurrentInput.id, gCurrentInput.strokeSize);
        drawCanvas();
    }
}

function onStrokeSizeDown() {
    if (gCurrentInput.strokeSize >= 0) {
        gCurrentInput.strokeSize -= 0.5;
        setStrokeSize(gCurrentInput.id, gCurrentInput.strokeSize);
        drawCanvas();
    }
}

//gallery
function onFilter(val) {
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
    if (urlImg === 'meme-imgs/upload-image.jpg') {
        document.querySelector('#upload-input').click();
    } else {
        initMeme(urlImg);
        document.querySelector('.gallery-container').classList.add('hide');
        document.querySelector('.editor-container').classList.remove('hide');
    }
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
        return `<div onclick="onImgClick('${img.url}')" class="container">
                    <img src="${img.url}" alt="Avatar" class="image img-gallery" style="width:100%">
                    <div class="middle">
                    </div>
                </div>`
    }, []);
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function initEditMenu() {
    document.getElementById('txt-color').value = '#ffffff';
    document.getElementById('txt-stroke').value = '#000000';
    document.querySelector('.input-txt-editor').value = '';
}

function onGalleryClick() {
    var meme = getMeme();
    meme.txts.forEach(() => {
        onDeleteText();
    });
    var imgBackground = getImgBackground();
    initInputTxtCount();
    createMeme();
    initMeme(imgBackground.src);
    initEditMenu();
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}

function onAbout() {
    document.querySelector('.contact-modal').classList.toggle('hide');
}

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        initMeme(img.src);
        setImgBackground(img);
    }
    reader.readAsDataURL(e.target.files[0]);
}


// open modal emoji
function onBtnEmoji() {
    document.querySelector('.icons-modal').classList.toggle('hide');
}

function openEmojiModal(ev) {
    document.querySelector('.icons-modal').classList.toggle('open-emojis');
    saveEmojiPos(ev);
}

function onEmojiClick(emoji) {
    document.querySelector('.icons-modal').classList.toggle('open-emojis');
    onEmojiAdd(emoji);
}

function closeEmojiModal() {
    document.querySelector('.icons-modal').classList.toggle('open-emojis');
}

function onTxtColor(color) {
    setTxtColor(gCurrentInput.id, color);
    drawCanvas();
}

function onTxtStroke(stroke) {
    setTxtStroke(gCurrentInput.id, stroke);
    drawCanvas();
}

function onFileInputChange(ev) {
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
    handleImage(ev);
}


function onTxtAlign(align) {
    setTxtAlign(gCurrentInput.id, align);
    drawCanvas();
}

function handleMouseDown(ev) {
    // ev.preventDefault();
    if (!ev.clientX) {
        gRect = ev.target.getBoundingClientRect();
        gStartX = parseInt(ev.touches[0].clientX - gRect.left);
        gStartY = parseInt(ev.touches[0].clientY - gRect.top);
    } else {
        gStartX = parseInt(ev.clientX - gCanvas.offsetLeft);
        gStartY = parseInt(ev.clientY - gCanvas.offsetTop);
    }
    var meme = getMeme();
    var texts = meme.txts;
    for (var i = 0; i < texts.length; i++) {
        if (textHitTest(texts[i], gStartX, gStartY)) {
            gSelectedText = texts[i].text;
            gSelectedTextIdx = i;
            gCurrentInput = texts[i];
            setTxtCords(gCurrentInput.id, gCurrentInput.x, gCurrentInput.y);
            document.querySelector('.input-txt-editor').value = gCurrentInput.text;
            document.getElementById('txt-color').value = gCurrentInput.color;
            document.getElementById('txt-stroke').value = gCurrentInput.stroke;
            drawCanvas();
            break;
        } else gSelectedTextIdx = -1;
    }
}

function handleMouseMove(ev) {
    if (gSelectedTextIdx < 0) { return; }
    ev.preventDefault();
    if (!ev.clientX) {
        gRect = ev.target.getBoundingClientRect();
        gMouseX = parseInt(ev.touches[0].clientX - gRect.left);
        gMouseY = parseInt(ev.touches[0].clientY - gRect.top);
    } else {
        gMouseX = parseInt(ev.clientX - gCanvas.offsetLeft);
        gMouseY = parseInt(ev.clientY - gCanvas.offsetTop);
    }
    var meme = getMeme();
    var dx = gMouseX - gStartX;
    var dy = gMouseY - gStartY;
    gStartX = gMouseX;
    gStartY = gMouseY;
    var texts = meme.txts;
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
    // ev.preventDefault();
    gSelectedTextIdx = -1;
}

function handleMouseOut(ev) {
    // ev.preventDefault();
    gSelectedTextIdx = -1;
}
