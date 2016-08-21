const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = new Array();
	}

	push(data, priority) {
		this.insertNode(new Node(data,priority));
		this.shiftNodeUp(new Node(data,priority));
	}

	pop() {
		
	}

	detachRoot() {
		var savedRoot=this.root;
		this.root=null;
		return savedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return 0;
	}

	isEmpty() {
		return this.parentNodes[0]==null;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
	}

	insertNode(node) {
	    
		if(this.root==null){
			this.root=node;
		}else{
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		if(this.parentNodes[0].left!=null && this.parentNodes[0].right!=null){
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
