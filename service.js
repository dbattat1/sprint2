'use strict';
var gCanvas;
var gCtx;
var gImg;
var gFont = 'Impact';

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 40,
        font: gFont,
        align: 'left',
        outlineColor: 'black',
        color: 'white',
        x: 225,
        y: 100,
        measurment: 0
    },
    {
        txt: '',
        size: 40,
        font: gFont,
        align: 'left',
        outlineColor: 'black',
        color: 'white',
        x: 150,
        y: 400,
        measurment: 0
    }
    ]
}

function createLine() {
    return {
        txt: '',
        size: 40,
        font: gFont,
        align: 'left',
        outlineColor: 'black',
        color: 'white',
        x: 150,
        y: 225,
        measurment: 0
    }
}

function setText(text) {
    if (!gMeme.lines.length) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2;
}

function setOutlineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].outlineColor = color;
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setHeight(change) {
    gMeme.lines[gMeme.selectedLineIdx].y += change;
}

function changeSelectedLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0;
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
}

function setFont(fontName) {
    gFont = fontName;
    gMeme.lines.forEach(line => line.font = gFont);
}

function addLine() {
    var newLine = createLine();
    gMeme.lines.push(newLine);
}

function setAlignment(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment;
}
