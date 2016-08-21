class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=null;
		this.left=null;
		this.right=null;
	}

	appendChild(node) {
		if(this.left==null){
			this.left=node;
		}else if(this.right==null){
			this.right=node;
		}
		node.parent=this;
	}

	removeChild(node) {
		node.parent=null;
		if(this.left==node){
			this.left=null;
		}else if(this.right==node){
			this.right=null;
		}
		else{
			throw "node is not a child of this node"; 
		}

	}

	remove() {
		if(this.parent==null){
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent==null){
			return;
		}
    	
        let copyOfParentOfParent = this.parent.parent;
        let copyOfParent = this.parent;
        let copyOfThis = this;
        let thisLeftSon=this.left;
        let thisRightSon=this.right;
        let parentOtherSon;
        let isThisLeftFromParent = this.parent.left==this ? true : false;
     
        if(isThisLeftFromParent){
    	    parentOtherSon=this.parent.right;
    	}else{
    		parentOtherSon=this.parent.left;
    	}
    	  
    	//
    
    	this.parent.remove();
    	this.remove();
    	//
    	if(copyOfParentOfParent!=null){
            copyOfParentOfParent.appendChild(copyOfThis);
    	}
    	if(parentOtherSon!=null){
    	    
            if(isThisLeftFromParent){
        	    copyOfThis.right=parentOtherSon;
        	    copyOfThis.left=null;
            }else{
        	    copyOfThis.left=parentOtherSon;
        	    copyOfThis.right=null;
        	}
        	parentOtherSon.parent=copyOfThis;
        }
        //
        copyOfThis.appendChild(copyOfParent);
    	if(thisLeftSon!=null){
            copyOfParent.left=thisLeftSon;
        	thisLeftSon.parent=copyOfParent;
        }
        if(thisRightSon!=null){
        	copyOfParent.right=thisRightSon;
        	thisRightSon.parent=copyOfParent;
        }	
	}
}

module.exports = Node;
