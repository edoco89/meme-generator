
var gMeme = {};
var gTxtCount = 1;


function createMeme() {
    gMeme = {
        selectedImg: 'none',
        txts: [
            {
                id: gTxtCount,
                text: '',
                size: 40,
                align: 'left',
                color: '#ffffff',
                stroke: '#000000',
                strokeSize: 1,
                x: 10,
                y: 50
            }
        ]
    }
}

function createText() {
    gTxtCount++;
    gMeme.txts.push(
        {
            id: gTxtCount,
            text: '',
            size: 40,
            align: 'left',
            color: '#ffffff',
            stroke: '#000000',
            strokeSize: 1,
            x: 10,
            y: 50
        }
    );
}

function deletText(txtId){
    gTxtCount--;
    var textIdx = gMeme.txts.findIndex(txt => {
        return txt.id === txtId
    })
    gMeme.txts.splice(textIdx, 1);
}

function getInputTxtCount(){
    return gTxtCount;
}
function initInputTxtCount() {
    gTxtCount = 1;
}

function setImgBackground(img) {
    gMeme.selectedImg = img;
}

function getImgBackground() {
    return gMeme.selectedImg;
}

function getMeme() {
    return gMeme;
}


function getTextById(txtId) {
    return gMeme.txts.find(txt => {
        return txt.id === txtId;
    });
}

function setTxtCords(txtId, x, y) {
    var text = getTextById(txtId);
    text.x = x;
    text.y = y;
}


function setTxtColor(txtId, color) {
    var text = getTextById(txtId);
    text.color = color;
}

function setTxtStroke(txtId, stroke) {
    var text = getTextById(txtId);
    text.stroke = stroke;
}

function setText(txtId, text) {
    var txt = getTextById(txtId);
    txt.text = text;
}

function setTxtSize(txtId, size) {
    var text = getTextById(txtId);
    text.size = size;
}

function setStrokeSize(txtId, strokeSize) {
    var text = getTextById(txtId);
    text.strokeSize = strokeSize;
}


function setImgBackground(img) {
    gMeme.selectedImg = img;
}


function setTxtAlign(txtId, align) {
    var text = getTextById(txtId);
    text.align = align;
}
