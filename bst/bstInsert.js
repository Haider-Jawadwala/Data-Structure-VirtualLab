    // Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY David Galles ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco


function displayComment(str){
	$("#ins").html(str);
}
// Constants.

BST.LINK_COLOR = "#000000";
BST.HIGHLIGHT_CIRCLE_COLOR = "#000000";
BST.FOREGROUND_COLOR = "#000000";
BST.BACKGROUND_COLOR = "#FFFFFF";
BST.PRINT_COLOR = BST.FOREGROUND_COLOR;

BST.WIDTH_DELTA  = 50;
BST.HEIGHT_DELTA = 50;
BST.STARTING_Y = 50;


BST.FIRST_PRINT_POS_X  = 50;
BST.PRINT_VERTICAL_GAP  = 20;
BST.PRINT_HORIZONTAL_GAP = 50;
BST.INSERT_NOS = 0;


function BST(am, w, h)
{
	this.init(am, w, h);
}

BST.prototype = new Algorithm();
BST.prototype.constructor = BST;
BST.superclass = Algorithm.prototype;



BST.prototype.init = function(am, w, h)
{
	var sc = BST.superclass;
	this.startingX =  w / 2;
	this.first_print_pos_y  = h - 2 * BST.PRINT_VERTICAL_GAP;
	this.print_max  = w - 10;

	var fn = sc.init;
	fn.call(this,am);
	this.addControls();
	this.nextIndex = 0;
	this.commands = [];
	this.cmd("CreateLabel", 0, "", 20, 10, 0);
	this.nextIndex = 1;
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}


BST.prototype.addControls =  function()
{
	this.insertField =  document.getElementById("bst-demo-insert-text");
	this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), 4);
	this.insertButton = document.getElementById("bst-demo-insert-btn");
	this.insertButton.onclick = this.insertCallback.bind(this);
	this.resetButton = document.getElementById("bst-demo-reset-btn");
	this.resetButton.onclick = function() {location.reload();};

}

BST.prototype.reset = function()
{
	this.nextIndex = 1;
	this.treeRoot = null;
}

BST.prototype.insertCallback = function(event)
{
	if(isNaN(this.insertField.value)){
		displayComment("Invalid Input. Kindly enter a 2 digit whole number");
		return;
	}
	if(BST.INSERT_NOS++ > 6){
		displayComment("Max insertions reached for this instance of demo. Reset if you want to play around more.");
		return;
	}

	var insertedValue = this.insertField.value;
	// Get text value
	insertedValue = this.normalizeNumber(insertedValue, 2);
	if (insertedValue != "")
	{
		// set text value
		this.insertField.value = "";
		this.implementAction(this.insertElement.bind(this), insertedValue);
	}
}

BST.prototype.insertAuto = function(insertedValue)
{
	// Get text value
	insertedValue = this.normalizeNumber(insertedValue, 4);
	if (insertedValue != "")
	{
		// set text value
		this.insertField.value = "";
		this.implementAction(this.insertElement.bind(this), insertedValue);
	}

	this.animationManager.skipForward();
}



BST.prototype.insertElement = function(insertedValue)
{
	this.commands = new Array();	
	this.cmd("SetText", 0, "Inserting "+insertedValue);
	this.highlightID = this.nextIndex++;
	
	if (this.treeRoot == null)
	{
		this.cmd("CreateCircle", this.nextIndex, insertedValue,  this.startingX, BST.STARTING_Y);
		this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
		this.cmd("Step");				
		this.treeRoot = new BSTNode(insertedValue, this.nextIndex, this.startingX, BST.STARTING_Y)
		this.nextIndex += 1;
	}
	else
	{
		this.cmd("CreateCircle", this.nextIndex, insertedValue, 100, 100);
		this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
		this.cmd("Step");				
		var insertElem = new BSTNode(insertedValue, this.nextIndex, 100, 100)
		
		
		this.nextIndex += 1;
		this.cmd("SetHighlight", insertElem.graphicID, 1);
		this.insert(insertElem, this.treeRoot)
		this.resizeTree();				
	}
	this.cmd("SetText", 0, "");				
	return this.commands;
}


BST.prototype.insert = function(elem, tree)
{
	this.cmd("SetHighlight", tree.graphicID , 1);
	this.cmd("SetHighlight", elem.graphicID , 1);
	
	if (elem.data < tree.data)
	{
		this.cmd("SetText", 0,  elem.data + " < " + tree.data + ".  Looking at left subtree");				
	}
	else
	{
		this.cmd("SetText",  0, elem.data + " >= " + tree.data + ".  Looking at right subtree");				
	}
	this.cmd("Step");
	this.cmd("SetHighlight", tree.graphicID, 0);
	this.cmd("SetHighlight", elem.graphicID, 0);
	
	if (elem.data < tree.data)
	{
		if (tree.left == null)
		{
			this.cmd("SetText", 0,"Found null tree, inserting element");				
			
			this.cmd("SetHighlight", elem.graphicID, 0);
			tree.left=elem;
			elem.parent = tree;
			this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
		}
		else
		{
			this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
			this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
			this.cmd("Step");
			this.cmd("Delete", this.highlightID);
			this.insert(elem, tree.left);
		}
	}
	else
	{
		if (tree.right == null)
		{
			this.cmd("SetText",  0, "Found null tree, inserting element");				
			this.cmd("SetHighlight", elem.graphicID, 0);
			tree.right=elem;
			elem.parent = tree;
			this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
			elem.x = tree.x + BST.WIDTH_DELTA/2;
			elem.y = tree.y + BST.HEIGHT_DELTA
			this.cmd("Move", elem.graphicID, elem.x, elem.y);
		}
		else
		{
			this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
			this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
			this.cmd("Step");
			this.cmd("Delete", this.highlightID);
			this.insert(elem, tree.right);
		}
	}
	
	
}



BST.prototype.resizeTree = function()
{
	var startingPoint  = this.startingX;
	this.resizeWidths(this.treeRoot);
	if (this.treeRoot != null)
	{
		if (this.treeRoot.leftWidth > startingPoint)
		{
			startingPoint = this.treeRoot.leftWidth;
		}
		else if (this.treeRoot.rightWidth > startingPoint)
		{
			startingPoint = Math.max(this.treeRoot.leftWidth, 2 * startingPoint - this.treeRoot.rightWidth);
		}
		this.setNewPositions(this.treeRoot, startingPoint, BST.STARTING_Y, 0);
		this.animateNewPositions(this.treeRoot);
		this.cmd("Step");
	}
	
}

BST.prototype.setNewPositions = function(tree, xPosition, yPosition, side)
{
	if (tree != null)
	{
		tree.y = yPosition;
		if (side == -1)
		{
			xPosition = xPosition - tree.rightWidth;
		}
		else if (side == 1)
		{
			xPosition = xPosition + tree.leftWidth;
		}
		tree.x = xPosition;
		this.setNewPositions(tree.left, xPosition, yPosition + BST.HEIGHT_DELTA, -1)
		this.setNewPositions(tree.right, xPosition, yPosition + BST.HEIGHT_DELTA, 1)
	}
	
}
BST.prototype.animateNewPositions = function(tree)
{
	if (tree != null)
	{
		this.cmd("Move", tree.graphicID, tree.x, tree.y);
		this.animateNewPositions(tree.left);
		this.animateNewPositions(tree.right);
	}
}

BST.prototype.resizeWidths = function(tree) 
{
	if (tree == null)
	{
		return 0;
	}
	tree.leftWidth = Math.max(this.resizeWidths(tree.left), BST.WIDTH_DELTA / 2);
	tree.rightWidth = Math.max(this.resizeWidths(tree.right), BST.WIDTH_DELTA / 2);
	return tree.leftWidth + tree.rightWidth;
}





function BSTNode(val, id, initialX, initialY)
{
	this.data = val;
	this.x = initialX;
	this.y = initialY;
	this.graphicID = id;
	this.left = null;
	this.right = null;
	this.parent = null;
}

BST.prototype.disableUI = function(event)
{
	this.insertField.disabled = true;
	this.insertButton.disabled = true;

}

BST.prototype.enableUI = function(event)
{
	this.insertField.disabled = false;
	this.insertButton.disabled = false;
}


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new BST(animManag, canvas.width, canvas.height);
	
}
