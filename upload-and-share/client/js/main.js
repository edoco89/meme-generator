var canvas;
var ctx;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}