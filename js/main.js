var gCanvas;
var gCtx;
var gCanvasBackground;


function init() {
    gCanvas = document.querySelector('#canvas');
    // gCanvas.width = document.body.clientWidth;
    // gCanvas.height = document.body.clientHeight;
    gCtx = canvas.getContext('2d');
    renderGallery();
}

function handleCanvasClick(ev) {
    setInitialCoords(ev.offsetX, ev.offsetY);
    setLastTimestamp(ev.timeStamp);
}

function drawCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = document.body.clientWidth;
    gCanvas.height = document.body.clientHeight;
    gCanvasBackground();
    gCtx = canvas.getContext('2d');
    onTextAdd(document.getElementById('txt-top').value);
    onTextAdd(document.getElementById('txt-bottom').value);

    var emojis = getEmoji();
    if (emojis) {
        onEmojiAdd(emojis);
    }
}

function onTextAdd(txt) {
    gCtx.beginPath();
    gCtx.font = "30px Arial";
    gCtx.fillText(txt, 10, 50);
    gCtx.stroke();
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
    gCurrentTxtPos = 1;
    // gCtx.fillStyle = 'white';
}

function saveCanvas(elLink) {
    var imgContent = canvas.toDataURL();
    console.dir(elLink);
    elLink.href = imgContent;
    elLink.download = 'my-canvas.jpg';
}



//button hamburger toggle
function toggleMenu() {
    document.querySelector('.btn-top-container').classList.toggle('open-btn');
}


function renderGallery() {
    var imgs = getGallery();
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

function imageToCanvas(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    gCanvasBackground = img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function onGalleryClick() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}

// upload Image
function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas);
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
    onGalleryClick();
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
    // console.dir(emoji);
    saveEmoji(emoji);
}