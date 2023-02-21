var canvasA = document.getElementById("stackA");
canvasA.width = 400;
canvasA.height = 280;
var stackA_canvas = canvasA.getContext("2d");
var canvasB = document.getElementById("stackB");
canvasB.width = 400;
canvasB.height = 280;
var stackB_canvas = canvasB.getContext("2d");
class stack_exercise {
    constructor(){
         this.txtSize = 25;
         this.lineDist = 1;
         this.rectNo = 8;
         this.lineNo = this.rectNo - 1;
         this.rectHeight = 30;
         this.rectWidth = this.rectHeight * 4;
         this.rectStartx = 200;
         this.rectStarty = 5;
         this.valuesA = [];
         this.checkLength = 8;
         this.valuesB = [];
         this.output = [];
         this.resetarray = [];
         this.submitted = 0;
    };
};
let stack_exercise_artefact = new stack_exercise();
function clearCanvas(ctx) {
    if(ctx === stackA_canvas) ctx.clearRect(0, 0, canvasA.width, canvasA.height);
    if(ctx === stackB_canvas) ctx.clearRect(0, 0, canvasB.width, canvasB.height);
}
function drawStackStructure(ctx) {
ctx.beginPath();
ctx.rect(stack_exercise_artefact.rectStartx, stack_exercise_artefact.rectStarty, stack_exercise_artefact.rectWidth, stack_exercise_artefact.rectHeight*stack_exercise_artefact.rectNo + stack_exercise_artefact.lineNo*stack_exercise_artefact.lineDist);            		
ctx.closePath();
} 
function writeNumbers(ctx) {
clearCanvas(ctx);
drawStackStructure(ctx);

var values = [];	
if(ctx === stackA_canvas) values = stack_exercise_artefact.valuesA;
else values = stack_exercise_artefact.valuesB;
		
ctx.beginPath();
for(var i=0; i<values.length; i++)
{
    if(ctx===stackA_canvas) ctx.fillStyle = "#880808";
    else ctx.fillStyle = "#696969";
    ctx.fillRect(stack_exercise_artefact.rectStartx, stack_exercise_artefact.rectStarty+(stack_exercise_artefact.lineDist*stack_exercise_artefact.lineNo)+(stack_exercise_artefact.rectNo*stack_exercise_artefact.rectHeight)-((i+1)*stack_exercise_artefact.rectHeight)-(i*stack_exercise_artefact.lineDist), stack_exercise_artefact.rectWidth, stack_exercise_artefact.rectHeight);
}
ctx.closePath();

ctx.beginPath();
		
for(var i=0; i<values.length; i++) 
{
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
		    
    txt = values[i].toString();
    txtWidth = ctx.measureText(txt).width;
		    
    txtX = stack_exercise_artefact.rectStartx + (stack_exercise_artefact.rectWidth-txtWidth)/2;
    txtY = stack_exercise_artefact.rectStarty+(stack_exercise_artefact.lineDist*stack_exercise_artefact.lineNo)+(stack_exercise_artefact.rectNo*stack_exercise_artefact.rectHeight)-(i*stack_exercise_artefact.lineDist)-((i+1)*stack_exercise_artefact.rectHeight)+stack_exercise_artefact.rectHeight/2+8;
		    
    ctx.fillText(txt, txtX, txtY);  
}

ctx.closePath();
}
function pushtoa(){
    if(stack_exercise_artefact.submitted === 1)return;
    if(stack_exercise_artefact.valuesB.length > 0) 
    {
        var value = stack_exercise_artefact.valuesB.pop();
        stack_exercise_artefact.valuesA.push(value);
        document.getElementById('ins').innerHTML = value + ' is popped from stackB and pushed to stackA';
        
        writeNumbers(stackA_canvas);
        writeNumbers(stackB_canvas);
    }	
}
function pushtob(){
    if(stack_exercise_artefact.submitted === 1)return;
    if(stack_exercise_artefact.valuesA.length > 0) 
    {
        var value = stack_exercise_artefact.valuesA.pop();
        stack_exercise_artefact.valuesB.push(value);
        document.getElementById('ins').innerHTML = value + ' is popped from stackA and pushed to stackB';
        
        writeNumbers(stackA_canvas);
        writeNumbers(stackB_canvas);
     }	
}
function popa(){
if(stack_exercise_artefact.submitted === 1)return;
if(stack_exercise_artefact.valuesA.length > 0) {
        var value = stack_exercise_artefact.valuesA.pop();
        stack_exercise_artefact.output.push(value);
        document.getElementById('ins').innerHTML = 'Your output: ' + stack_exercise_artefact.output;

        writeNumbers(stackA_canvas);
    }	
}
function popb(){
if(stack_exercise_artefact.submitted === 1)return;
if(stack_exercise_artefact.valuesB.length > 0) {
        var value = stack_exercise_artefact.valuesB.pop();
        stack_exercise_artefact.output.push(value);
        document.getElementById('ins').innerHTML = 'Your output: ' + stack_exercise_artefact.output;
        
        writeNumbers(stackB_canvas);
    }	
}
function generateQuestion() {
    stack_exercise_artefact.output = [];
    var flag = 0;
    for(var i=0; i<8; i++) 
    {
        stack_exercise_artefact.valuesA[i] = Math.floor((Math.random() * 9999) + 1);
        stack_exercise_artefact.resetarray[i] = stack_exercise_artefact.valuesA[i];
    }
    for(var i=1; i<8; i++) if(stack_exercise_artefact.valuesA[i]<stack_exercise_artefact.valuesA[i-1]) flag = 1; 
    if(flag===0) stack_exercise_artefact.valuesA[4] = stack_exercise_artefact.valuesA[3]/2;
    stack_exercise_artefact.valuesB = [];
    drawStackStructure(stackA_canvas);
    writeNumbers(stackA_canvas);
    drawStackStructure(stackB_canvas);
    writeNumbers(stackB_canvas);
    handlers();
    document.getElementById("ins").innerHTML = "";
}
function reset(){
    var flag = 0;
    for(var i=0; i<8; i++) 
    {
        stack_exercise_artefact.valuesA[i] = stack_exercise_artefact.resetarray[i]; 
    }
    for(var i=1; i<8; i++) if(stack_exercise_artefact.valuesA[i]<stack_exercise_artefact.valuesA[i-1]) flag = 1; 
    if(flag===0) stack_exercise_artefact.valuesA[4] = stack_exercise_artefact.valuesA[3]/2;
     console.log(stack_exercise_artefact.valuesA);
    stack_exercise_artefact.valuesB = [];
    document.getElementById("ins").innerHTML = "<b>Execution is reset</b>";  
    drawStackStructure(stackA_canvas);
    writeNumbers(stackA_canvas);
    drawStackStructure(stackB_canvas);
    writeNumbers(stackB_canvas);
    stack_exercise_artefact.output = [];
    stack_exercise_artefact.submitted = 0;
}
function onsubmit(){
    stack_exercise_artefact.submitted = 1;
    if(stack_exercise_artefact.output.length<8){
            document.getElementById("ins").innerHTML = "Incorrect";
    }
    else{

    for(var i=1; i<stack_exercise_artefact.output.length; i++) 
    {
        if(stack_exercise_artefact.output[i] < stack_exercise_artefact.output[i-1]) 
        {
            document.getElementById("ins").innerHTML = "Incorrect";
            return;
        }
     }
     document.getElementById("ins").innerHTML = "Correct";
    }
}  
function handlers()
{ 
    document.getElementById("push-button-to-B").onclick = function() { pushtob(); };
    document.getElementById("push-button-to-A").onclick = function() { pushtoa(); };
    document.getElementById("pop-button-A").onclick = function() { popa(); };
    document.getElementById("pop-button-B").onclick = function() { popb(); };
    document.getElementById("generate-question-stackex").onclick = function() { generateQuestion(); };
    document.getElementById("checkButton-stckex").onclick = function() { onsubmit(); };
    document.getElementById("reset-stckex").onclick = function() { reset(); };
};
