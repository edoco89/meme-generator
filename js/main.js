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
    meme.selectedImg.onload();
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
    gCtx.strokeStyle= text.stroke;
    gCtx.fillStyle = text.color;
    gCtx.textAlign = text.align;
    gCtx.font = `${text.size} Arial`;
    gCtx.fillText(text.text, text.x , text.y, gCanvas.width);
    gCtx.strokeText(text.text, text.x , text.y, gCanvas.width);
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


