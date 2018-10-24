
var gMeme = {};
var gPosX = {
    left: 10,
    center: 300,
    right: 600
}
var gTxtCount = 1;

const MAX_Y = 500;
const MIN_Y = 50;
const MAX_X = 10;
const MIN_X = 500;



function createMemes() {
    gMeme = {
        selectedImg: 'none',
        txts: [
            {
                id: gTxtCount,
                text: '',
                size: 40,
                align: 'left',
                color: 'white',
                stroke: 'black',
                x: 10,
                y: 50
            }
            // ,
            // {
            //     id: 'txt-bottom',
            //     text: '',
            //     size: 40,
            //     align: 'left',
            //     color: 'white',
            //     stroke: 'black',
            //     x: 10,
            //     y: canvas.height + 300
            // }
        ]
    }
}

function createMeme() {
    gTxtCount++;
    gMeme.txts.push(
        {
            id: gTxtCount,
            text: '',
            size: 40,
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: 10,
            y: 50
        }
    );
}
function getInputTxtCount(){
    return gTxtCount;
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
    text.size = `${size}px`;
}

function setTxtAlign(txtId, align) {
    var text = getTextById(txtId);
    text.align = align;
}

function setImgBackground(img) {
    gMeme.selectedImg = img;
}

function setTxtAlign(txt, align) {
    txt.align = align;
    console.log(txt);
}

function setTxtPosX(txtId, posx) {
    var text = getTextById(txtId);
    text.x =  gPosX[posx];
    console.log(text.x);
    setTxtAlign(text, posx);
}

function setTxtCoords(txtId, x, y) {
    var text = getTextById(txtId);
    text.x = x;
    text.y = y;
}