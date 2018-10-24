var gCanvas;
var gCtx;
var gCanvasBackground;


function init() {
    gCanvas = document.querySelector('#canvas');
    // gCanvas.width = document.body.clientWidth;
    // gCanvas.height = document.body.clientHeight;
    gCtx = canvas.getContext('2d');
    createGallery();
    renderGallery(getGallery());
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
    gColor = getColor();
    gCtx.strokeStyle= "black";
    gCtx.fillStyle = gColor;
    gCtx.textAlign = "center";
    gCtx.font = "40px Arial";
    gCtx.fillText(txt, gCanvas.width / 2 , 50, gCanvas.width);
    gCtx.strokeText(txt, gCanvas.width / 2 , 50, gCanvas.width);
    // gCanvas.height
    // gCtx.stroke();
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
    gCanvasBackground();
    document.getElementById('txt-top').value = '';
    document.getElementById('txt-bottom').value = '';
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

//gallery
function onFilter(val){
    // debugger;
    if(val){
        var filterdImages = searchKey(val);
        if(!filterdImages){
            renderGallery(getGallery());
        }else{
            renderGallery(filterdImages);
        }
    } else {
        renderGallery(getGallery());
    }
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

function imageToCanvas(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    gCanvasBackground = img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    drawCanvas();
}


function onGalleryClick() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}


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
    document.querySelector('.icons-modal').classList.toggle('hide');
    saveEmoji(emoji);
}


