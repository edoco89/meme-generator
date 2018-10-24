
var gMemes = {};
var gTxtAddedCount = 0;

const MAX_Y = 500;
const MIN_Y = 50;
const MAX_X = 10;
const MIN_X = 500;


function createMemes() {
    gMemes = {
        selectedImg: 'none',
        txts: [
            {
                id: 'txt-top',
                text: '',
                size: '40px',
                align: 'left',
                color: 'white',
                stroke: 'black',
                x: canvas.width / 2,
                y: 50
            },
            {
                id: 'txt-bottom',
                text: '',
                size: '40px',
                align: 'left',
                color: 'white',
                stroke: 'black',
                x: canvas.width / 2,
                y: canvas.height + 300
            }
        ]
    }
}

function createMeme() {
    gTxtCount++;
    gMeme.txts.push(
        {
            id: `txt-${gTxtCount}`,
            text: '',
            size: '40px',
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: canvas.width / 2,
            y: canvas.height + 300
        }
    );
}

function setImgBackground(img) {
    gMemes.selectedImg = img;
}

function getImgBackground() {
    return gMemes.selectedImg;
}

function getMeme() {
    return gMemes;
}


function getTextById(txtId) {
    return gMemes.txts.find(txt => {
        return txt.id === txtId;
    })
}

function setTxtCords(txtId, x, y) {
    var text = getTextById(txtId);
    text.x = x;
    text.y = y;
}

function setLastTimestamp(timeStamp) {
    gPrevTimeStemp = timeStamp;
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
    // console.log(txt.text);
}

function setTxtSize(txtId, size) {
    var text = getTextById(txtId);
    text.size = size;
}

function setTxtAlign(txtId, align) {
    var text = getTextById(txtId);
    text.align = align;
}

function setImgBackground(img) {
    gMemes.selectedImg = img;
}


