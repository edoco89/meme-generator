var gCanvas;
var gCtx;
var gCurrentTxtPos = 1;


function init() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = document.body.clientWidth;
    gCanvas.height = document.body.clientHeight;
    gCtx = canvas.getContext('2d');
    renderGallery();
}

function handleCanvasClick(ev) {
    setInitialCoords(ev.offsetX, ev.offsetY);
    setLastTimestamp(ev.timeStamp);
}

function onTextAdd(txt, ev) {
    gCtx.beginPath();
    gCtx.font = "30px Arial";
    gCtx.fillText(txt , 10, gCurrentTxtPos * 50);
    gCurrentTxtPos++;
    var txtInput = document.getElementById('txt-add');
    txtInput.value = '';
    gCtx.stroke();
    // gCtx.closePath();
}

function clearCanvas() {
    gCtx = null;
    gCtx = gCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCurrentTxtPos = 1;
    // gCtx.fillStyle = 'white';
}

function saveCanvas(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'my-canvas.jpg';
}


//button hamburger toggle
function toggleMenu() {
    document.querySelector('.btn-top-container').classList.toggle('open-btn');
}


function renderGallery(){
    var imgs = getGallery();
    var strHTML = imgs.map(img => {
        return `<img onclick="onImgClick('${img.url}')" class="img-gallery" src="${img.url}">`
    },[]);
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
}

function onImgClick(urlImg){
    console.log(urlImg);
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');

}