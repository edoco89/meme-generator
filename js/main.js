var gCanvas;
var gCtx;


function init() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = document.body.clientWidth;
    gCanvas.height = document.body.clientHeight;
    gCtx = canvas.getContext('2d');
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

