

// ***** GLOBAL VARIABLE ***** //

var gCanvas;
var gCtx;
var gStartX;
var gStartY;
var gMouseX;
var gMouseY;
var gSelectedInputIdx = -1;
var gCurrentInput;
var gCleare = false;
var gRect;



// ***** INIT ***** //

// When the page load
function init() {
    createGallery();
    renderGallery(getGallery());
    createMeme();
    gCanvas = document.querySelector('#canvas');
    gCanvas.addEventListener("touchmove", handleMouseMove, false);
    gCanvas.addEventListener("touchend", handleMouseUp, false);
    gCanvas.addEventListener("touchancelc", handleMouseOut, false);
    gCanvas.addEventListener("touchstart", handleMouseDown, false);
}

// When the user pick a background, the canvas is loaded and get the background the user choose.
function initMeme(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        setImgBackground(img);
        gCtx = canvas.getContext('2d');
        var meme = getMeme();
        var elCanvas = document.querySelector('.canvas-container');
        gCanvas.width = elCanvas.clientWidth;
        var ratio = meme.selectedImg.height / meme.selectedImg.width;
        gCanvas.height = gCanvas.width * ratio;
        gCurrentInput = meme.txts[0];
        drawCanvas();
    }
}



// ***** CANVAS ***** //

// Draw all the canvas elements the users already made
function drawCanvas() {
    var meme = getMeme();
    gCtx.drawImage(meme.selectedImg, 0, 0, gCanvas.width, gCanvas.height);
    meme.txts.forEach(text => {
        gCtx.strokeStyle = text.stroke;
        gCtx.fillStyle = text.color;
        gCtx.textAlign = text.align;
        gCtx.font = `${text.size}px impact`;
        gCtx.lineWidth = text.strokeSize;
        gCtx.fillText(text.text, text.x, text.y);
        gCtx.strokeText(text.text, text.x, text.y);
        text.width = gCtx.measureText(text.text).width;
        text.height = text.size;
    });
    var emojis = getEmojis();
    emojis.forEach(emoji => {
        gCtx.font = `${emoji.size}px impact`;
        gCtx.fillText(emoji.emoji, emoji.x, emoji.y);
        emoji.width = emoji.size;
        emoji.height = emoji.size;
    });
}

// Clearing the canvas
function clearCanvas() {
    var meme = getMeme();
    meme.txts.forEach(() => {
        onDeleteInput();
    });
    var emojis = getEmojis();
    emojis.forEach(() => {
        onDeleteInput();
    })
    var imgBackground = getImgBackground();
    createMeme();
    initTxtCount();
    initEmojisCount();
    setImgBackground(imgBackground);
    initEditMenu();
    drawCanvas();
}


// ***** GENERAL INPUT ***** //

// When editin the input text, if emoji, do nothing 
// (the changes on the emoji won't shown, we dont want to add anything to the emoji).
function onSetInput(input) {
    if (!gCurrentInput.emoji) {
        setText(gCurrentInput.id, input);
    }
    drawCanvas();
}

// Delete the current input
function onDeleteInput() {
    if (!gCleare) {
        var meme = getMeme();
        if (!gCurrentInput.emoji) {
            if (getTxtCount() > 0) {
                deletText(gCurrentInput.id);
                gCurrentInput = meme.txts[0];
                initEditMenu();
                onAddText();
                drawCanvas();
            } else if (getTxtCount() <= 0) {
                gCleare = true;
            }
        } else if (getEmojisCount() > 0) {
            deletEmoji(gCurrentInput.id);
            gCurrentInput = meme.txts[0];
            initEditMenu();
            drawCanvas();
        }
    }
}

// Make the input bigger
function onInputSizeUp() {
    if (gCurrentInput.size < 101) {
        gCurrentInput.size += 5;
        if (!gCurrentInput.emoji) {
            setTxtSize(gCurrentInput.id, gCurrentInput.size);
        } else {
            setEmojiSize(gCurrentInput.id, gCurrentInput.size);
        }
        drawCanvas();
    }
}

// Make the input smaller
function onInputSizeDown() {
    if (gCurrentInput.size > 9) {
        gCurrentInput.size -= 5;
        if (!gCurrentInput.emoji) {
            setTxtSize(gCurrentInput.id, gCurrentInput.size);
        } else {
            setEmojiSize(gCurrentInput.id, gCurrentInput.size);
        }
        drawCanvas();
    }
}

// Init the values of the editor container inputs
function initEditMenu() {
    document.getElementById('txt-color').value = '#ffffff';
    document.getElementById('txt-stroke').value = '#000000';
    document.querySelector('.input-txt-editor').value = '';
}


// ***** TEXT INPUT ***** //

// When user want to add text, the func create new txt, and init the new txt
// As current input
function onAddText() {
    createText();
    var meme = getMeme();
    gCurrentInput = meme.txts[getTxtCount() - 1];
    initEditMenu();
    drawCanvas();
}


// Make the txt stroke size bigger
function onStrokeSizeUp() {
    if (gCurrentInput.strokeSize < 10) {
        gCurrentInput.strokeSize += 0.5;
        setStrokeSize(gCurrentInput.id, gCurrentInput.strokeSize);
        drawCanvas();
    }
}

// Make the txt stroke size smaller
function onStrokeSizeDown() {
    if (gCurrentInput.strokeSize >= 0) {
        gCurrentInput.strokeSize -= 0.5;
        setStrokeSize(gCurrentInput.id, gCurrentInput.strokeSize);
        drawCanvas();
    }
}

// When setting new txt color
function onTxtColor(color) {
    setTxtColor(gCurrentInput.id, color);
    drawCanvas();
}

// When setting new txt stroke
function onTxtStroke(stroke) {
    setTxtStroke(gCurrentInput.id, stroke);
    drawCanvas();
}

// Not good enough
// function onTxtAlign(align) {
//     setTxtAlign(gCurrentInput.id, align);
//     drawCanvas();
// }

// ***** EMOJI INPUT ***** //


// Create emoji in the emoji-service,  and rendering the canvas
function onEmojiAdd(emoji) {
    createEmoji(emoji);
    var emojis = getEmojis();
    gCurrentInput = emojis[getEmojisCount() - 1];
    document.querySelector('.input-txt-editor').value = gCurrentInput.emoji;
    drawCanvas();
}

// Delete the current emoji, init the current input as the first txt that been added
// And init the new emoji as the current input
function onEmojiDelete() {
    deletEmoji(gCurrentInput.id);
    var meme = getMeme();
    gCurrentInput = meme.txts[0];
    initEditMenu();
    drawCanvas();
}

// Open emoji-modal 
function onBtnEmoji() {
    document.querySelector('.icons-modal').classList.toggle('hide');
}

// When choosing new emoji, the func adding new emoji, and hide the emoji selection menu
function onEmojiClick(emoji) {
    onEmojiAdd(emoji);
    // document.querySelector('.icons-modal').classList.toggle('hide');
}

// **** GALLERY **** //

// Rendering the gallery
function renderGallery(imgs) {
    var strHTML = imgs.map(img => {
        return `<div onclick="onImgClick('${img.url}')" class="container">
                    <img src="${img.url}" alt="Avatar" class="image img-gallery" style="width:100%">
                    <div class="middle">
                    </div>
                </div>`
    }, []);
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}


// When choosing an image, hide the gallery page and call to initMeme()
function onImgClick(urlImg) {
    if (urlImg === 'meme-imgs/upload-image.jpg') {
        document.querySelector('#upload-input').click();
    } else {
        initMeme(urlImg);
        document.querySelector('.gallery-container').classList.add('hide');
        document.querySelector('.editor-container').classList.remove('hide');
    }
}

// When upload new image
function onFileInputChange(ev) {
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
    handleImage(ev);
}

// Handling the upload image
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        initMeme(img.src);
        setImgBackground(img);
    }
    reader.readAsDataURL(e.target.files[0]);
}


// **** FILTER **** //

// Filtering the image in the gallery and rendering the filtered gallery
function onFilter(val) {
    if (val) {
        var filterdImages = searchKey(val);
        if (!filterdImages) {
            renderGallery(getGallery());
        } else {
            renderGallery(filterdImages);
        }
    } else {
        renderGallery(getGallery());
    }
}

// rendering key words that the user type
function renderKeywords(val) {
    if (!val) {
        document.querySelector('.filter-words').innerHTML = '';
    } else {
        var words = getKeywords();
        var wordsKeys = Object.keys(words);
        var strHTML = wordsKeys.map(word => {
            var wordSize = 20;
            if (words[word].count >= 1 && words[word].count < 3) {
                wordSize = 25;
            } else if (words[word].count >= 3 && words[word].count < 6) {
                wordSize = 30;
            } else if (words[word].count >= 6 && words[word].count < 9) {
                wordSize = 35;
            } else if (words[word].count >= 9 && words[word].count < 12) {
                wordSize = 40;
            } else if (words[word].count >= 12) {
                wordSize = 45;
            }
            return `<a style="font-size:${wordSize}px" class="word-link" onclick="onKeyClick('${word}')">${word}</a>`
        }, []);
        document.querySelector('.filter-words').innerHTML = strHTML.join('');
    }
}

// When clicking on an existing key word, rendering the gallery with the key word
function onKeyClick(word) {
    onFilter(word);
}


// ***** MAIN MENU ***** //

// Hamburger button toggle
function toggleMenu() {
    document.querySelector('.btn-top-container').classList.toggle('open-btn');
}

// when clicking on the gallery selection in the menu
function onGalleryClick() {
    var meme = getMeme();
    meme.txts.forEach(() => {
        onDeleteInput();
    });
    var imgBackground = getImgBackground();
    initTxtCount();
    initEmojisCount();
    createMeme();
    initMeme(imgBackground.src);
    initEditMenu();
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.btn-top').innerText = 'Gallery';
    document.querySelector('.editor-container').classList.toggle('hide');
}

// When clicking on the about us section in the menu
function onAbout() {
    document.querySelector('.contact-modal').classList.toggle('hide');
}


// ***** MOUSE/TOUCH EVENTS HANDLING ***** //


// Checking whether the mouse/touch is an exsisting input
// If it is an input, then init the gCurrentInput to be the selected input
function handleMouseDown(ev) {
    if (!ev.clientX) {
        gRect = ev.target.getBoundingClientRect();
        gStartX = parseInt(ev.touches[0].clientX - gRect.left);
        gStartY = parseInt(ev.touches[0].clientY - gRect.top);
    } else {
        gStartX = parseInt(ev.clientX - gCanvas.offsetLeft);
        gStartY = parseInt(ev.clientY - gCanvas.offsetTop);
    }
    var meme = getMeme();
    var texts = meme.txts;
    for (var i = 0; i < texts.length; i++) {
        if (textHitTest(texts[i], gStartX, gStartY)) {
            gSelectedInputIdx = i;
            gCurrentInput = texts[i];
            setTxtCords(gCurrentInput.id, gCurrentInput.x, gCurrentInput.y);
            document.querySelector('.input-txt-editor').value = gCurrentInput.text;
            document.getElementById('txt-color').value = gCurrentInput.color;
            document.getElementById('txt-stroke').value = gCurrentInput.stroke;
            drawCanvas();
            break;
        } else gSelectedInputIdx = -1;
    }
    var emojis = getEmojis();
    for (var i = 0; i < emojis.length; i++) {
        if (textHitTest(emojis[i], gStartX, gStartY)) {
            gSelectedInputIdx = i;
            gCurrentInput = emojis[i];
            setEmojiCords(gCurrentInput.id, gCurrentInput.x, gCurrentInput.y);
            document.querySelector('.input-txt-editor').value = gCurrentInput.emoji;
            document.getElementById('txt-color').value = '#ffffff';
            document.getElementById('txt-stroke').value = '#000000';
            drawCanvas();
            break;
        }
    }
}

// Handling the mouse/touch mpvement when holding an input
function handleMouseMove(ev) {
    if (gSelectedInputIdx < 0) { return; }
    ev.preventDefault();
    if (!ev.clientX) {
        gRect = ev.target.getBoundingClientRect();
        gMouseX = parseInt(ev.touches[0].clientX - gRect.left);
        gMouseY = parseInt(ev.touches[0].clientY - gRect.top);
    } else {
        gMouseX = parseInt(ev.clientX - gCanvas.offsetLeft);
        gMouseY = parseInt(ev.clientY - gCanvas.offsetTop);
    }
    var dx = gMouseX - gStartX;
    var dy = gMouseY - gStartY;
    gStartX = gMouseX;
    gStartY = gMouseY;
    if (!gCurrentInput.emoji) {
        var meme = getMeme();
        var texts = meme.txts;
        var text = texts[gSelectedInputIdx];
        gCurrentInput = text;
        gCurrentInput.x += dx;
        gCurrentInput.y += dy;
        setTxtCords(gCurrentInput.id, gCurrentInput.x, gCurrentInput.y);
    } else if (gCurrentInput.emoji) {
        var emojis = getEmojis();
        var emoji = emojis[gSelectedInputIdx];
        gCurrentInput = emoji;
        gCurrentInput.x += dx;
        gCurrentInput.y += dy;
        setEmojiCords(gCurrentInput.id, gCurrentInput.x, gCurrentInput.y);
    }
    drawCanvas();
}

// Check whether the mouse/touch is input
function textHitTest(input, x, y) {
    return (x >= input.x &&
        x <= input.x + input.width &&
        y >= input.y - input.height &&
        y <= input.y);
}

// When mouse/touch up
function handleMouseUp(ev) {
    gSelectedInputIdx = -1;
}

// When mouse/touch out of the canvas
function handleMouseOut(ev) {
    gSelectedInputIdx = -1;
}
