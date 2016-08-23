const Node = require('./node');

class MaxHeap {

	constructor() {
		this.root = null;
		this.parentNodes = new Array();
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.isEmpty()){
			return;
		}
		let detached =  this.detachRoot();
		if(this.isEmpty()){
			this.restoreRootFromLastInsertedNode({});
		    return detached.data;
		}
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
	}

	detachRoot() {
		var savedRoot = this.root;
		var rootIndexInParentNodes = this.parentNodes.indexOf(savedRoot);
		if(rootIndexInParentNodes != -1){
			this.parentNodes.splice(rootIndexInParentNodes, 1);
		}
		this.root = null;
		return savedRoot;
	}

    restoreRootFromLastInsertedNode(detached) {
        if(typeof detached.data === 'undefined'){
    		return;
    	}
		var lastInsertedElement = this.parentNodes.pop();
		var lastInsertedElementParent = lastInsertedElement.parent;
		
		if(lastInsertedElementParent.left == lastInsertedElement){
			lastInsertedElementParent.left = null;
    	}else{
    		lastInsertedElementParent.right = null;
    	}
		this.root = lastInsertedElement;
		this.root.parent = null;
	    
	    if(detached.left !=	lastInsertedElement){
	    	lastInsertedElement.left = detached.left;
	    	if(lastInsertedElement.left != null){
	    		lastInsertedElement.left.parent = lastInsertedElement;
	    	}
	    }
	    if(detached.right != lastInsertedElement){
	    	lastInsertedElement.right = detached.right;
	    	if(lastInsertedElement.right != null){
	    		lastInsertedElement.right.parent = lastInsertedElement;
	    	}
	    }

	    if(lastInsertedElementParent != detached){
	    	this.parentNodes.unshift(lastInsertedElementParent);
		}
		this.parentNodes.unshift(lastInsertedElement);
        
        if(this.root.left != null && this.root.right != null){
        	this.parentNodes.shift();
		}
	}

	size() {
		if(this.isEmpty()){
			return 0;
		}
		let allNodesArray = new Array();
		for (var i = 0; i < this.parentNodes.length; i++) {
			var currentNode = this.parentNodes[i];
			if(allNodesArray.indexOf(currentNode) == -1){
				allNodesArray.push(currentNode);
			}
			while(currentNode.parent != null){
				currentNode = currentNode.parent;
				if(allNodesArray.indexOf(currentNode) == -1){
					allNodesArray.push(currentNode);
				}
			}
		}
		return allNodesArray.length;
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.root == null){
			this.root = node;
		}else{
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		if(this.parentNodes[0].left != null && this.parentNodes[0].right != null){
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if(node.parent == null){
			this.root = node;
			return;
		}
		if(node.parent.priority >= node.priority){
			return;
		}
		if(this.parentNodes.length != 0){
		   let nodeIndex = this.parentNodes.indexOf(node);
		   let nodeParentIndex = this.parentNodes.indexOf(node.parent);
		   if(nodeIndex != -1){
		   	if(nodeParentIndex !=-1){
		   		this.parentNodes[nodeParentIndex] = node;
		    }
		    this.parentNodes[nodeIndex] = node.parent;
		   }
		}
		node.swapWithParent();
		this.shiftNodeUp(node);
	}


	shiftNodeDown(node) {
	    
		if((node.left == null) && (node.right == null)){
			return;
		}
		//get max priority value of node children
		let maxOfNodesChildPriority;
		if(node.right != null){
		    maxOfNodesChildPriority = Math.max(node.left.priority, node.right.priority);
	    }else{
	        maxOfNodesChildPriority = node.left.priority;
	    }
	    //return if no need to swap
		if(node.priority >= maxOfNodesChildPriority){
			return;
		}
	
		let isMaxChildLeft = node.left.priority == maxOfNodesChildPriority ? true : false;
		//change order of parentNodes
		let nodeMaxChildIndex;
		if(this.parentNodes.length != 0){
			if(isMaxChildLeft){
				nodeMaxChildIndex = this.parentNodes.indexOf(node.left);
			}else{
				nodeMaxChildIndex = this.parentNodes.indexOf(node.right);
			}
			let nodeIndex = this.parentNodes.indexOf(node);
		   	if(nodeMaxChildIndex != -1){
		   		if(nodeIndex != -1){
		   			if(isMaxChildLeft){
		   		        this.parentNodes[nodeIndex] = node.left;
		   		    }else{
		   		    	this.parentNodes[nodeIndex] = node.right;
		   		    }
		    	}
		    	this.parentNodes[nodeMaxChildIndex]=node;
		    }
		}
		//swapWithParent
		let isNodeRoot = node == this.root ? true : false;
		if(isMaxChildLeft){
			node.left.swapWithParent();
		}else{
			node.right.swapWithParent();
		}
		if(isNodeRoot){
			this.root=node.parent;
		}

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
