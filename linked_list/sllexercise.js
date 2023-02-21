var box = new Image();
var tbox = new Image();
var sbox = new Image();
var boxline = new Image();
var arrowtriangle = new Image();
var arrowline = new Image();
var dot = new Image();
var reversetriangle = new Image();
var ques_string = document.getElementById("questionid");
var canvas = document.getElementById("linkedlist");
var ctx = canvas.getContext("2d");
var headX = 180;
var headY = 110;
var topgap = 170;
var leftgap = 120;
var ncolor = "white";
var scolor = "green";
var dcolor = "#9898fb";
var gtype = 'sll';
var nWidth = 127;
var nHeight = 93 * 0.9;
var linegap = 90;
var linewidth = 2;
var lineheight = 63;
var dotwidth = 17;
var dotheight = 16;
var rectHeight = 50;
var numbers = [];
var boxDist = 148;
var value;
var keyc = 0;
var busy = 0;
var tvalues = [];
var quesnumbers = [];
var count = 5;
function handlers(){ 
 document.getElementById("head-insert").onclick = function() { insertAtHead(); };
 document.getElementById("tail-insert").onclick = function() { insertAtTail(); };
 document.getElementById("node-insert").onclick = function() { insertAtNode(); };
 document.getElementById("submit-button").onclick = function() { check(); };
 document.getElementById("reset-button").onclick = function() { reseter(); };
}; 
Array.prototype.insert = function ( index, item ) {
	this.splice( index, 0, item );
};
String.prototype.isNumber = function(){ 
	return /^-{0,1}\d+$/.test(this);
};
function clear(){
	document.getElementById('HeadtoBeInserted').value="";
	document.getElementById('TailtoBeInserted').value="";
	document.getElementById('AnytoBeInserted').value="";
	document.getElementById('index').value="";
}
function counter() {
    count--;
    if (count === 0) renderer();
}

function imgdeclarer() {
    box.onload = counter;
    tbox.onload = counter;
    sbox.onload = counter;
    boxline.onload = counter;
    arrowtriangle.onload = counter;
    arrowline.onload = counter;
    dot.onload = counter;

    box.src = 'slldemosearch-rectangle-19-copy-13@2x.png';
    tbox.src = 'slldemoinsert-rectangle-19-copy-12@2x.png';
    sbox.src = 'slldemosearch-rectangle-19-copy-14@2x.png';
    boxline.src = 'slldemosearch-path-5@2x.png';
    arrowtriangle.src = 'slldemosearch-triangle 4@2x.png';
    arrowline.src = 'slldemosearch-path-15 4@2x.png';
    dot.src = 'slldemosearch-oval-7-copy@2x.png';
    reversetriangle.src = 'imageedit_2_7773519787.png';
}
function drawBox(x, y, ind, color) {
    val = numbers[ind];
    if (color == ncolor)
        ctx.drawImage(box, x, y, nWidth, nHeight);
    else if (color == scolor)
        ctx.drawImage(sbox, x, y, nWidth, nHeight);
    else
        ctx.drawImage(tbox, x, y, nWidth, nHeight);

    ctx.globalAlpha = 0.5;
    ctx.drawImage(boxline, x + linegap * 0.9, y + (nHeight - lineheight) / 2, linewidth, lineheight);
    ctx.globalAlpha = 1;

    if (ind == numbers.length - 1) {
        ctx.drawImage(arrowtriangle, x + (linegap + 15 + 43 + 45) * 0.9, y + (nHeight - dotheight) / 2 - 5, 20, 14);
        ctx.drawImage(arrowline, x + linegap + 15, y + (nHeight - dotheight) / 2, 100 * 0.7, 5);
    } else {
        ctx.drawImage(arrowtriangle, x + (linegap + 15 + 43) * 0.9, y + (nHeight - dotheight) / 2 - 5, 20, 14);
        ctx.drawImage(arrowline, x + linegap + 15, y + (nHeight - dotheight) / 2, 55 * 0.6, 5);
    }

    ctx.drawImage(dot, x + (linegap + 15) * 0.9, y + (nHeight - dotheight) / 2 - 5, dotwidth, dotheight);

    ctx.beginPath();
    if (color == ncolor)
        ctx.fillStyle = "#2180bc";
    else if (color == scolor)
        ctx.fillStyle = "#fff";
    else
        ctx.fillStyle = "#fff";

    ctx.font = "25px OpenSans-Regular";
    var ll = ctx.measureText(val).width;
    ctx.fillText(numbers[ind], x + (linegap - ll) / 2, (rectHeight) + y);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}
function drawArrow(startX, startY, endX, endY) {
    ctx.beginPath();
    var headlen = 20; // length of head in pixels
    var angle = Math.atan2(endY - startY, endX - startX);

    ctx.strokeStyle = "#d2d2d2";
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fillStyle = "#979091";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function draw_head() {
    ctx.beginPath();
    ctx.font = "22px OpenSans-SemiBold";
    ctx.fillStyle = "#2f99d1";
    ctx.fillText("Head", headX - 20, headY - 30);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    var radius = 7;
    ctx.arc(headX, headY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#d7d7d7';
    ctx.strokeStyle = "#d7d7d7";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function renderer() {
    ctx.clearRect(0, 0, 1360, 320);
    draw_head();
    drawArrow(headX, headY, headX, topgap);
    for (var i = 0; i < numbers.length; i++) {
        drawBox(leftgap + (i * boxDist), topgap, i, ncolor);
    }
    // if (numbers.length > 0)
    //     drawBox(leftgap + (numbers.length - 1) * (boxDist), topgap, numbers.length - 1, ncolor);
    ctx.beginPath();
    ctx.font = "22px OpenSans-SemiBold";
    ctx.fillStyle = "#2f99d1";
    ctx.fillText("Null", leftgap + (numbers.length) * (boxDist) + 55, topgap + rectHeight / 2 + 20);
    ctx.fill();
    ctx.closePath();
}
function srenderer() {
    ctx.clearRect(0, 0, 1360, 320);
    draw_head();
    drawArrow(headX, headY, headX, topgap);
    drawBox(leftgap, topgap, 0, dcolor);
    for (var i = 1; i < numbers.length; i++) {
        drawBox(leftgap + (i * boxDist), topgap, i, ncolor);
    }
    ctx.beginPath();
    ctx.font = "22px OpenSans-SemiBold";
    ctx.fillStyle = "#2f99d1";
    ctx.fillText("Null", leftgap + (numbers.length) * (boxDist) + 55, topgap + rectHeight / 2 + 10);
    ctx.fill();
    ctx.closePath();
}
function array_maker(){
	if (decider==1)
		numbers.push(value);
	if (decider==2)
		numbers.insert(index,value);	
	if (decider==3)
		numbers.splice(index-1, 1);
	if (decider==4)
		numbers.unshift(value);
}
function nodeshift() {
    if (keyc == boxDist) {
        busy = 0;
        clearInterval(shift_stopper);
        array_maker();
        renderer();
        return;
    }
    if (keyc == -boxDist) {
        busy = 0;
        clearInterval(shift_stopper);
        array_maker();
        renderer();
        return;
    }
    ctx.clearRect(0, 0, 1360, 320);
    draw_head();
    if (decider == 4)
        drawArrow(headX, headY, headX + keyc, topgap);
    else
        drawArrow(headX, headY, headX, topgap);

    for (var i = 0; i < index - 1; i++) {
        drawBox(leftgap + (i * boxDist), topgap, i, ncolor);
    }
    if (decider == 2) {
        i = index - 1;
        drawBox(leftgap + (i * boxDist), topgap, i, ncolor);
    }
    for (var i = index; i < numbers.length; i++) {
        drawBox(leftgap + (i * boxDist) + keyc, topgap, i, ncolor);
    }
    ctx.beginPath();
    ctx.font = "22px OpenSans-SemiBold";
    ctx.fillStyle = "#2f99d1";
    ctx.fillText("Null", leftgap + (numbers.length) * (boxDist) + 55 + keyc, topgap + rectHeight / 2 + 20);
    ctx.fill();
    ctx.closePath();
    if (decider == 3)
        keyc = keyc - 1;
    else
        keyc = keyc + 1;
}
function colorer(last) {
    if (numa == last) {
        if (decider == 1) {
            array_maker();
            busy = 0;
            clearInterval(color_stopper);
            renderer();
        }
        if (decider == 2) {
            shift_stopper = setInterval(nodeshift, 1);
            setTimeout(function() {
                clearInterval(color_stopper);
                busy = 0;
            }, boxDist);
        }
        return;
    }
    ctx.clearRect(0, 0, 1360, 320);
    renderer();
    for (var i = 0; i < numbers.length; i++) {
        if (i != numa)
            drawBox(leftgap + (i * boxDist), topgap, i, ncolor);
        else
            drawBox(leftgap + (i * boxDist), topgap, i, dcolor);
    }
    if (gtype != 'cll') {
        ctx.beginPath();
        ctx.font = "22px OpenSans-SemiBold";
        ctx.fillStyle = "#2f99d1";
        ctx.fillText("Null", leftgap + (numbers.length) * (boxDist) + 55 + keyc, topgap + rectHeight / 2 + 20);
        ctx.fill();
        ctx.closePath();
    }
    numa = numa + 1;
}
function insertAtHead() {
    if (busy == 1) {
        clear();
        return;
    }
    else
        busy = 1;
    value = document.getElementById('HeadtoBeInserted').value;
    index = 0;
    keyc = 0;
    decider = 4;
    if (numbers.length == 7) {
        document.getElementById('ins').innerHTML= "Only 7 boxes allowed";
        clear();
        busy = 0;
        return;
    }
    clear();
	shift_stopper = setInterval(nodeshift, 1);
}
function insertAtTail() {
    if (busy == 1) {
        clear();
        return;
    }
    else
        busy = 1;
    numa = 0;
    keyc = 0;
    decider = 1;
    value = document.getElementById('TailtoBeInserted').value;
    if (numbers.length == 7) {
        document.getElementById('ins').innerHTML= "Only 7 boxes allowed";
        clear();
        busy = 0;
        return;
    }
    index = numbers.length;
    clear();
	color_stopper = setInterval(colorer, 500, index);
}
function insertAtNode() {
    if (busy == 1) {
        clear();
        return;
    }
    else
        busy = 1;
    numa = 0;
    keyc = 0;
    decider = 2;
    value = document.getElementById('AnytoBeInserted').value;
    index = document.getElementById('index').value;
    if (!index.isNumber()) {
        document.getElementById('ins').innerHTML= "Enter Numbers";
        clear();
        busy = 0;
        return;
    }
    if ((index > String(parseInt(numbers.length)-1)) || (index < 1)) {
        if (numbers.length == 0)
            document.getElementById('ins').innerHTML= "Linked List is empty!";
        else
            document.getElementById('ins').innerHTML= "Node no should lie between 1 and " + String(parseInt(numbers.length)-1) + " !";
        clear();
        busy = 0;
        return;
    }
    if (numbers.length == 7) {
        document.getElementById('ins').innerHTML= "Only 7 boxes allowed";
        clear();
        busy = 0;
        return;
    }
    clear();
    color_stopper = setInterval(colorer, 500, index);
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function q2() {
    for (var i = 0; i < numbers.length; i++)
        tvalues[i] = numbers[i];
    var extras = randomIntFromInterval(1, 3);
    for (var i = 0; i < extras; i++) {
        var temp = randomIntFromInterval(1, 100);
        var rindex = randomIntFromInterval(0, tvalues.length);
        tvalues.insert(rindex, temp);
    }
    for (var i = 0; i < tvalues.length - 1; i++)
        ques_string.innerHTML = ques_string.innerHTML + ' ' + tvalues[i] + ',';
    ques_string.innerHTML = ques_string.innerHTML + ' ' + tvalues[tvalues.length - 1];
}
function check() {
    ansl = 0;
    if (numbers.length != tvalues.length)
        ansl = 1;
    else {
        for (i = 0; i < numbers.length; i++) {
            if (tvalues[i] != numbers[i]) {
                ansl = 1;
                break;
            }
        }
    }
    if (ansl == 1) {
        document.getElementById('ins').innerHTML= "Wrong";
    } else {
        document.getElementById('ins').innerHTML= "Correct";
    }
    clear();
}
function llgenerator(){
	for (i=0; i<randomIntFromInterval(3,6); i++) {
		var temp = Math.floor((Math.random() * 100) + 1);
		numbers.push(temp);
		quesnumbers.push(temp);
	}
}
function reseter(){
	location.reload();
}
llgenerator();
imgdeclarer();
srenderer();
q2();
