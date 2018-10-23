var gColor = '#ffffff';
var gPrevX = 0;
var gPrevY = 0;
var gPrevTimeStemp;
var gMeme = {
    selectedImg: null,
    txts: [
{
line: 'I never eat Falafel', size: 20,
align: 'left',
color: 'red'
}
] }


function setInitialCoords(x, y) {
    gPrevX = x;
    gPrevY = y;
}

function setLastTimestamp(timeStamp) {
    gPrevTimeStemp = timeStamp;
}

function setInitialCoords(x, y) {
    gPrevX = x;
    gPrevY = y;
}


function setColor(color) {
    gColor = color;
}

function getColor(){
    return gColor;
}

function setImgBackground(img) {
    gMeme.selectedImg = img;
}

function getImgBackground() {
    return gMeme.selectedImg;
}
