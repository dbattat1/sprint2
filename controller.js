'use strict';
var gClicked;


function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    var strHtml = '';
    for (var i = 1; i <= 18; i++) {
        strHtml += `<img src=".\\meme-imgs (square)\\${i}.jpg" onclick="onSetPicture(${i})">`;
    }
    document.querySelector('.gallery-images').innerHTML = strHtml;
}

function onSetPicture(idx) {
    gMeme.selectedImgId = idx;
    changeUiArea();
    var img = new Image();
    img.src = `\\meme-imgs (square)\\${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gImg = img;
        renderCanvas();
    }
}

function changeUiArea() {
    document.querySelector('.gallery').classList.add('hide');
    document.querySelector('.editor').classList.add('flex');
    document.querySelector('.editor').classList.remove('hide');
}

function onGoToGallery() {
    document.querySelector('.editor').classList.remove('flex');
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallery').classList.remove('hide');
}

/*------------------Editor------------------*/

function renderCanvas() {
    gCanvas.width = gImg.width;
    gCanvas.height = gImg.height;
    gCtx.drawImage(gImg, 0, 0);

    if (!gMeme.lines.length) return

    gMeme.lines.forEach(line => drawText(line));

}


function drawText(line) {
    line.x = (line.align === 'left') ? 10 : (line.align === 'right') ? 430 : 150;
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = line.outlineColor;
    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.textAlign = line.align;
    line.measurment = gCtx.measureText(line.txt)
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function onSetText() {
    const text = document.querySelector('[name="lineText"]').value
    setText(text);
    renderCanvas();
}

function onIncreaseFontSize() {
    increaseFontSize();
    renderCanvas();
}

function onDecreaseFontSize() {
    decreaseFontSize();
    renderCanvas();
}

function onSetOutlineColor() {
    const color = document.querySelector('[name="outlineColor"]').value;
    setOutlineColor(color);
    renderCanvas();
}

function onSetColor() {
    const color = document.querySelector('[name="color"]').value;
    setColor(color);
    renderCanvas();
}

function onSetHeight(change) {
    setHeight(change);
    renderCanvas();
}

function onChangeSelectedLine() {
    changeSelectedLine();
    document.querySelector('[name="color"]').value = gMeme.lines[gMeme.selectedLineIdx].color;
    document.querySelector('[name="outlineColor"]').value = gMeme.lines[gMeme.selectedLineIdx].outlineColor;
    document.querySelector('[name="lineText"]').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    document.querySelector('[name="lineText"]').value = '';
    renderCanvas();
}

function onSetFont(elSelect) {
    setFont(`${elSelect.value}`);
    renderCanvas();
}

function onAddLine() {
    addLine();
    changeSelectedLine();
    document.querySelector('[name="lineText"]').value = '';
}

function onSetAlignment(alignment) {
    setAlignment(alignment);
    renderCanvas();
}




function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    // console.log('data', data)
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvasOnLoad);
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.editor').innerHTML = '';
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function renderCanvasOnLoad(img) {
    gImg = img;
    changeUiArea();
    renderCanvas();
}


function onUploadImg(el, ev) {
    uploadImg(el, ev);
}




function onCanvasClicked(ev) {
    var offsetX = ev.offsetX
    var offsetY = ev.offsetY
    // console.log('offsetX', offsetX, 'offsetY', offsetY)
    var clickedLine = gMeme.lines.find(line => {
        return offsetX > line.x
            && offsetX < line.x + line.measurment.width
            && offsetY > line.y - line.size
            && offsetY < line.y 
    })
    console.log(clickedLine);
    gClicked = clickedLine;
}

function onMove(e) {
    console.log(e);
    if (gClicked) {
        gClicked.x = e.pageX - gClicked.x;
        gClicked.y = e.pageY - gClicked.y;
    }
    renderCanvas();
};








// gCtx.font()
// gCtx.measureText(txt:str)
// gMeme.lines[gMeme.selectedLineIdx].measurment.onmousedown = function(e) {
//     var mouseX = e.pageX - this.offsetLeft;
//     var mouseY = e.pageY - this.offsetTop;
//     var height = gMeme.lines[gMeme.selectedLineIdx.y];
//     var width = gMeme.lines[gMeme.selectedLineIdx.x];


//     if (mouseX >= (currentX - width/2) &&
//         mouseX <= (currentX + width/2) &&
//         mouseY >= (currentY - height/2) &&
//         mouseY <= (currentY + height/2)) {
//       isDraggable = true;
//     }
// };

// gCanvas.onmouseup = function(e) {
//     isDraggable = false;
//   };

//  gCanvas.onmouseout = function(e) {
//     isDraggable = false;
//   };

 


