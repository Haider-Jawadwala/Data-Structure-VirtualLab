var canvasA = document.getElementById("queue_ex");
var canvasB = document.getElementById("queue_2_ex");
var queueA_canvas = canvasA.getContext("2d");
var queueB_canvas = canvasB.getContext("2d");
class queue_Exercise {
    constructor() {
        this.rand = 0;
        this.txtSize = 25;
        this.rectWidth = 60;
        this.rectHeight = 60;
        this.rectStartx = 165;
        this.rectStarty = 83;
        this.arrayDist = 5;
        this.head = -1;
        this.tail = -1;
        this.headb = -1;
        this.tailb = -1;
        this.hArrowStartx = this.rectStartx + this.rectWidth / 2;
        this.hArrowStarty = this.rectStarty - 10; //
        this.hArrowEndx = this.hArrowStartx;
        this.hArrowEndy = this.hArrowStarty - 40;
        this.hArrowHeadOffsetx = 10;
        this.hArrowHeadOffsety = 10;
        this.hArrowHeadx = 5;
        this.hArrowHeady = 10; //
        this.tArrowStartx = this.rectStartx + this.rectWidth / 2;
        this.tArrowStarty = this.rectStarty + this.rectHeight + 10; //
        this.tArrowEndx = this.tArrowStartx;
        this.tArrowEndy = this.tArrowStarty + 40;
        this.tArrowHeadOffsetx = 10;
        this.tArrowHeadOffsety = 10;
        this.tArrowTailx = 5;
        this.tArrowTaily = 17; //
        this.values = [];
        this.val = [];
        this.resultArray = [];
        this.sol = [];
        this.reset_array = [];
        this.resethead = -1;
        this.resettail = -1;
        this.done = 0;
    };
};
let queueexercise_artefact = new queue_Exercise();
function clearCanvas(ctx) {
                if (ctx === queueA_canvas) ctx.clearRect(0, 0, canvasA.width, canvasA.height);
                if (ctx === queueB_canvas) ctx.clearRect(0, 0, canvasB.width, canvasB.height);
            }
function drawQueueStructure(ctx) {
if (ctx === queueA_canvas) 
{
    headhere = 0;
    tailhere = queueexercise_artefact.tail-queueexercise_artefact.head;
}
else 
{
    headhere = 0;
    tailhere = queueexercise_artefact.tailb-queueexercise_artefact.headb;
}
ctx.beginPath();
if (headhere >= -1 && tailhere >= -1) 
{
    if(headhere===-1 && tailhere===-1)
    {
        headhere = 0;
        tailhere = 0;
    }
    ctx.strokeStyle = "#a4c652";
    ctx.fillStyle = "#a4c652";
    
    txta = "Queue A";
    txtb = "Queue B";
    queueA_canvas.fillStyle = "black";
    queueA_canvas.font = "25px arial";
    queueB_canvas.font = "25px arial";
    queueB_canvas.fillStyle = "black";
    queueA_canvas.fillText(txta,"10","125"); 
    queueB_canvas.fillText(txtb,"10","125"); 
    
    ctx.strokeStyle = "#a4c652";
    ctx.fillStyle = "#a4c652";
    ctx.fillRect(queueexercise_artefact.rectStartx + (headhere * queueexercise_artefact.rectWidth) + (headhere * queueexercise_artefact.arrayDist), queueexercise_artefact.rectStarty, queueexercise_artefact.rectWidth, queueexercise_artefact.rectHeight);
    for (var i = headhere + 1; i < tailhere; i++) 
    {
        ctx.fillStyle = "#880808";
        ctx.fillRect(queueexercise_artefact.rectStartx + (i * queueexercise_artefact.rectWidth) + (i * queueexercise_artefact.arrayDist), queueexercise_artefact.rectStarty, queueexercise_artefact.rectWidth, queueexercise_artefact.rectHeight);
    }
    ctx.fillStyle = "#696969";
    ctx.fillRect(queueexercise_artefact.rectStartx + (headhere * queueexercise_artefact.rectWidth) + (headhere * queueexercise_artefact.arrayDist), queueexercise_artefact.rectStarty, queueexercise_artefact.rectWidth, queueexercise_artefact.rectHeight);
    ctx.fillRect(queueexercise_artefact.rectStartx + (tailhere * queueexercise_artefact.rectWidth) + (tailhere * queueexercise_artefact.arrayDist), queueexercise_artefact.rectStarty, queueexercise_artefact.rectWidth, queueexercise_artefact.rectHeight);
}
ctx.closePath();
} 
function writeNumbers(ctx) {
clearCanvas(ctx);
drawQueueStructure(ctx);

ctx.shadowBlur = 0;
valueshere = [];
ctx.beginPath();
if (ctx === queueA_canvas) {
    valueshere = queueexercise_artefact.values;
    headhere = 0;
    tailhere = queueexercise_artefact.tail-queueexercise_artefact.head;
} else {
    valueshere = queueexercise_artefact.val;
    headhere = 0;
    tailhere = queueexercise_artefact.tailb-queueexercise_artefact.headb;
}


if (headhere > -1 && valueshere.length > 0 && tailhere > -1) {

for (var i = headhere; i <= tailhere; i++) {
    ctx.font = "20px Arial"
    ctx.fillStyle = "white";
    txt = valueshere[i - headhere].toString();
    txtWidth = ctx.measureText(txt).width;

    txtX = queueexercise_artefact.rectStartx + (i * queueexercise_artefact.rectWidth) + (i * queueexercise_artefact.arrayDist) + (queueexercise_artefact.rectWidth - txtWidth) / 2;;
    txtY = queueexercise_artefact.rectStarty + queueexercise_artefact.rectHeight - ((queueexercise_artefact.rectHeight - queueexercise_artefact.txtSize) / 2);

    ctx.fillText(txt, txtX, txtY);
    }
}

ctx.closePath();
if (headhere > -1) {
var relativeArrowPos = headhere * queueexercise_artefact.rectWidth + headhere * queueexercise_artefact.arrayDist;

ctx.beginPath();

ctx.moveTo(queueexercise_artefact.hArrowStartx + relativeArrowPos, queueexercise_artefact.hArrowStarty);
ctx.lineTo(queueexercise_artefact.hArrowEndx + relativeArrowPos, queueexercise_artefact.hArrowEndy);
ctx.strokeStyle = "#a4c652";
ctx.lineWidth = 1.5;
ctx.stroke();

ctx.moveTo(queueexercise_artefact.hArrowStartx + relativeArrowPos, queueexercise_artefact.hArrowStarty);
ctx.lineTo(queueexercise_artefact.hArrowStartx + relativeArrowPos - queueexercise_artefact.hArrowHeadOffsetx, queueexercise_artefact.hArrowStarty - queueexercise_artefact.hArrowHeadOffsety);
ctx.strokeStyle = "#a4c652";
ctx.stroke();

ctx.moveTo(queueexercise_artefact.hArrowStartx + relativeArrowPos, queueexercise_artefact.hArrowStarty);
ctx.lineTo(queueexercise_artefact.hArrowStartx + relativeArrowPos + queueexercise_artefact.hArrowHeadOffsetx, queueexercise_artefact.hArrowStarty - queueexercise_artefact.hArrowHeadOffsety);
ctx.strokeStyle = "#a4c652";
ctx.stroke();

htxt = "Front of the queue";
ctx.font = "18px Arial";
ctx.fillStyle = "black";
htxtWidth = ctx.measureText(htxt).width;
ctx.fillText(htxt, queueexercise_artefact.hArrowEndx + relativeArrowPos - htxtWidth / 2, queueexercise_artefact.hArrowEndy - queueexercise_artefact.hArrowHeady);

ctx.closePath();
}     
 if (tailhere > -1) {
var relativeArrowPos = tailhere * queueexercise_artefact.rectWidth + tailhere * queueexercise_artefact.arrayDist;;

ctx.beginPath();

ctx.moveTo(queueexercise_artefact.tArrowStartx + relativeArrowPos, queueexercise_artefact.tArrowStarty);
ctx.lineTo(queueexercise_artefact.tArrowEndx + relativeArrowPos, queueexercise_artefact.tArrowEndy);
ctx.strokeStyle = "#7bde3d";
ctx.lineWidth = 1.5;
ctx.stroke();

ctx.moveTo(queueexercise_artefact.tArrowStartx + relativeArrowPos, queueexercise_artefact.tArrowStarty);
ctx.lineTo(queueexercise_artefact.tArrowStartx + relativeArrowPos - queueexercise_artefact.tArrowHeadOffsetx, queueexercise_artefact.tArrowStarty + queueexercise_artefact.tArrowHeadOffsety);
ctx.strokeStyle = "#7bde3d";
ctx.stroke();

ctx.moveTo(queueexercise_artefact.tArrowStartx + relativeArrowPos, queueexercise_artefact.tArrowStarty);
ctx.lineTo(queueexercise_artefact.tArrowStartx + relativeArrowPos + queueexercise_artefact.tArrowHeadOffsetx, queueexercise_artefact.tArrowStarty + queueexercise_artefact.tArrowHeadOffsety);
ctx.strokeStyle = "#7bde3d";
ctx.stroke();

ttxt = "Rear of the queue";
ctx.font = "18px Arial";
ctx.fillStyle = "black";
ttxtWidth = ctx.measureText(ttxt).width;
ctx.fillText(ttxt, queueexercise_artefact.tArrowEndx + relativeArrowPos - ttxtWidth / 2, queueexercise_artefact.tArrowEndy + queueexercise_artefact.tArrowTaily);

ctx.closePath();
}
}
function enqueuetob(){
if(queueexercise_artefact.done==1)return;
if (queueexercise_artefact.head === -1 && queueexercise_artefact.tail === -1) {
    document.getElementById("ins").innerHTML = "Queue A is empty";
    return;                         
} else if (queueexercise_artefact.tailb > 16) {
    document.getElementById("ins").innerHTML = "Queue B is Full";                       
    return;                         
} else {
    var value = queueexercise_artefact.values.shift();
    queueexercise_artefact.head++;
    if (queueexercise_artefact.head > queueexercise_artefact.tail) {
        queueexercise_artefact.values = [];
        queueexercise_artefact.head = -1;
        queueexercise_artefact.tail = -1;
    }
    if (value === "" || value === null) return;
    else {
            queueexercise_artefact.val.push(value);
            if (queueexercise_artefact.headb === -1) queueexercise_artefact.headb++;
            queueexercise_artefact.tailb++;
            document.getElementById("ins").innerHTML = value + " is dequeued from queueA and enqueued to queueB";
            writeNumbers(queueA_canvas);
            writeNumbers(queueB_canvas);
        }
    }
}
function enqueuetoa(){
if(queueexercise_artefact.done==1)return;
if (queueexercise_artefact.headb === -1 && queueexercise_artefact.tailb === -1) {
    document.getElementById("ins").innerHTML = "Queue B is empty";                     
    return;                         
} else if (queueexercise_artefact.tail > 16) {
    document.getElementById("ins").innerHTML = "Queue A is Full";                   
    return;                         
} else {
    var value = queueexercise_artefact.val.shift();
    queueexercise_artefact.headb++;
    if (queueexercise_artefact.headb > queueexercise_artefact.tailb) {
        queueexercise_artefact.val = [];
        queueexercise_artefact.headb = -1;
        queueexercise_artefact.tailb = -1;
    }
    if (value === "" || value === null) return;
    else {
        queueexercise_artefact.values.push(value);
        if (queueexercise_artefact.head === -1) queueexercise_artefact.head++;
        queueexercise_artefact.tail++;
        document.getElementById("ins").innerHTML = value + " is dequeued from queueB and enqueued to queueA";
        writeNumbers(queueA_canvas);
        writeNumbers(queueB_canvas);
        }
    }
}
function reset(){
    queueexercise_artefact.sol = [];
    queueexercise_artefact.head = queueexercise_artefact.resethead;
    queueexercise_artefact.tail = queueexercise_artefact.resettail;
    queueexercise_artefact.headb = -1;
    queueexercise_artefact.tailb = -1;
    queueexercise_artefact.val = [];
    queueexercise_artefact.done = 0;
    queueexercise_artefact.resultArray = [];
    queueexercise_artefact.values = queueexercise_artefact.reset_array.slice();
    queueexercise_artefact.resultArray = queueexercise_artefact.reset_array.slice();
    document.getElementById("ins").innerHTML = "<b>Execution is reset</b>";
    drawQueueStructure(queueA_canvas);
    writeNumbers(queueA_canvas);
    drawQueueStructure(queueB_canvas);
    writeNumbers(queueB_canvas);
}
function dequeueA(){
if(queueexercise_artefact.done==1)return;
if (queueexercise_artefact.head === -1 && queueexercise_artefact.tail === -1) {
    document.getElementById("ins").innerHTML = "Queue A is empty";                   
    return;                         
}
else {
    temp = queueexercise_artefact.values.shift();
    queueexercise_artefact.sol.push(temp);
    document.getElementById("ins").innerHTML = "Your output: " + queueexercise_artefact.sol;
    queueexercise_artefact.head++;
    if (queueexercise_artefact.head > queueexercise_artefact.tail) {
        queueexercise_artefact.values = [];
        queueexercise_artefact.head = -1;
        queueexercise_artefact.tail = -1;
        }
     writeNumbers(queueA_canvas);
    }
}
function dequeueB(){
if(queueexercise_artefact.done==1)return;
if (queueexercise_artefact.headb === -1 && queueexercise_artefact.tailb === -1) {
document.getElementById("ins").innerHTML = "Queue B is empty";
return;                         
            };

if (queueexercise_artefact.headb === -1 && queueexercise_artefact.tailb === -1) return;
    else {
        temp = queueexercise_artefact.val.shift();
        queueexercise_artefact.sol.push(temp);
        document.getElementById("ins").innerHTML = "Your output: " + queueexercise_artefact.sol;
        queueexercise_artefact.headb++;
        if (queueexercise_artefact.headb > queueexercise_artefact.tailb) {
            queueexercise_artefact.val = [];
            queueexercise_artefact.headb = -1;
            queueexercise_artefact.tailb = -1;
        }
        writeNumbers(queueB_canvas);
    }
}
function generateQuestion() {
    txtq1 = "A set of elements are given in Queue A. With the help of queue B, deque the elements in ASCENDING order.";
    txtq2 = "A set of numbers are given in Queue A. With the help of queue B, deque the elements in DESCENDING order.";
    queueexercise_artefact.rand = Math.floor((Math.random() * 9999) + 1) % 2;
    if(queueexercise_artefact.rand===0)
    {
        document.getElementById("question").innerHTML = "<b>Question:</b>" + txtq1;
    }
    else if (queueexercise_artefact.rand===1){
        document.getElementById("question").innerHTML = "<b>Question:</b>" + txtq2;

    }
    document.getElementById("ins").innerHTML = "";                   
    queueexercise_artefact.values = [];
    queueexercise_artefact.headb = -1;
    queueexercise_artefact.tailb = -1;
    queueexercise_artefact.val = [];
    queueexercise_artefact.resultArray = [];
    queueexercise_artefact.reset_array = [];
    queueexercise_artefact.sol = [];
    var elementNo = Math.floor((Math.random() * 7) + 1);
    if(elementNo<=4)
    {elementNo = 4;}
    if(elementNo >=7)
    {elementNo = 7;}
    for (var i = 0; i < elementNo; i++) {
        queueexercise_artefact.values[i] = Math.floor((Math.random() * 9999) + 1);
        queueexercise_artefact.resultArray[i] = queueexercise_artefact.values[i];
        queueexercise_artefact.reset_array[i] = queueexercise_artefact.values[i];
    }
    queueexercise_artefact.tail = elementNo - 1;
    queueexercise_artefact.head = elementNo - queueexercise_artefact.tail - 1;
    queueexercise_artefact.resethead = queueexercise_artefact.head;
    queueexercise_artefact.resettail = queueexercise_artefact.tail;
    handlers();
    drawQueueStructure(queueA_canvas);
    writeNumbers(queueA_canvas);
    drawQueueStructure(queueB_canvas);
    writeNumbers(queueB_canvas);
}
function check(){
    queueexercise_artefact.done = 1;
    if(queueexercise_artefact.rand === 0)
        {
            queueexercise_artefact.resultArray.sort(function(a, b) { return a - b });
        }
    else if(queueexercise_artefact.rand === 1)
        {
            queueexercise_artefact.resultArray.sort(function(a, b) { return b - a });
        }
    var flag = 0;
    for (var i = 0; i < queueexercise_artefact.resultArray.length; i++) {
        if (queueexercise_artefact.sol[i] != queueexercise_artefact.resultArray[i]) flag = 1;
    }
    if (flag) document.getElementById("ins").innerHTML = "Incorrect";
    else document.getElementById("ins").innerHTML = "Correct";
    queueexercise_artefact.sol = [];
}
function handlers()
{ 
    document.getElementById("generate-question-queue").onclick = function() { generateQuestion(); };
    document.getElementById("reset").onclick = function() { reset(); };
    document.getElementById("checkButton-queue").onclick = function() { check(); };
    document.getElementById("enqueue-to-A").onclick = function() { enqueuetoa(); };
    document.getElementById("enqueue-to-B").onclick = function() { enqueuetob(); };
    document.getElementById("dequeue-button").onclick = function() { dequeueA(); };
    document.getElementById("dequeue-buttonB").onclick = function() { dequeueB(); };
};
