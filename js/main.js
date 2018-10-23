var gCanvas;
var gCtx;


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
    gCtx.fillText(txt,ev.offsetX + 10,ev.offsetY + 50);
}

function clearCanvas() {
    gCtx = null;
    gCtx = gCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
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
}