
// ***** GLOBAL VARIABLE ***** //
var gMeme = {};
var gTxtCount = 1;


// Creating new meme 
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

// Creating new line in the exsisting meme
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

// delete line
function deletText(txtId){
    gTxtCount--;
    var textIdx = gMeme.txts.findIndex(txt => {
        return txt.id === txtId
    })
    gMeme.txts.splice(textIdx, 1);
}

// Return the lines number
function getTxtCount(){
    return gTxtCount;
}

// Init the lines number to 1
function initTxtCount() {
    gTxtCount = 0;
}

// Setting image background object
function setImgBackground(img) {
    gMeme.selectedImg = img;
}

// Return the image background object
function getImgBackground() {
    return gMeme.selectedImg;
}

// Return the meme object
function getMeme() {
    return gMeme;
}

// Return the txt object by id
function getTextById(txtId) {
    return gMeme.txts.find(txt => {
        return txt.id === txtId;
    });
}

// Setting the text (x, y) cords
function setTxtCords(txtId, x, y) {
    var text = getTextById(txtId);
    text.x = x;
    text.y = y;
}

// Setting text color
function setTxtColor(txtId, color) {
    var text = getTextById(txtId);
    text.color = color;
}

// Setting text stroke color
function setTxtStroke(txtId, stroke) {
    var text = getTextById(txtId);
    text.stroke = stroke;
}

// Setting the the text input
function setText(txtId, text) {
    var txt = getTextById(txtId);
    txt.text = text;
}

// Setting the text size
function setTxtSize(txtId, size) {
    var text = getTextById(txtId);
    text.size = size;
}

// Setting the stroke size
function setStrokeSize(txtId, strokeSize) {
    var text = getTextById(txtId);
    text.strokeSize = strokeSize;
}

// Setting the text alignment
function setTxtAlign(txtId, align) {
    var text = getTextById(txtId);
    text.align = align;
}
