class Node {

	constructor(data, priority) {
	   this.data = data;
	   this.priority = priority;
	   this.parent = null;
	   this.left = null;
	   this.right = null;
	}

    appendChild(node) {
	   if(this.left == null){
		  this.left = node;
	   } else if(this.right == null){
		  this.right = node;
	   }
       node.parent=this;
	}

    removeChild(node) {
	   node.parent = null;
	   if(this.left == node){
	       this.left = null;
		} else if(this.right == node){
            this.right = null;
        } else{
		  throw "node is not a child of this node"; 
		}

	}

	remove() {
		if(this.parent == null){
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
        let thisLeftChild = this.left;
        let thisRightChild = this.right;
        let isThisParentsLeftChild = this.parent.left==this ? true : false;
        let parentsSecondChild;
        if(isThisParentsLeftChild){
            parentsSecondChild = this.parent.right;
    	}else{
            parentsSecondChild = this.parent.left;
    	}

    	//remove This and its parent
    	this.parent.remove();
    	this.remove();

    	//merge PoP with This, merge This with Parents second child
    	if(copyOfParentOfParent != null){
            copyOfParentOfParent.appendChild(copyOfThis);
    	}
    	if(parentsSecondChild != null){
            if(isThisParentsLeftChild){
                copyOfThis.right = parentsSecondChild;
        	    copyOfThis.left = null;
            }else{
                copyOfThis.left = parentsSecondChild;
                copyOfThis.right = null;
        	}
        	parentsSecondChild.parent = copyOfThis;
        }
        
        //merge Parent with This childs
        copyOfThis.appendChild(copyOfParent);
    	if(thisLeftChild != null){
            copyOfParent.left = thisLeftChild;
            thisLeftChild.parent = copyOfParent;
        }else{
            copyOfParent.left = null;
        }
        if(thisRightChild != null){
            copyOfParent.right = thisRightChild;
        	thisRightChild.parent = copyOfParent;
        }
        else{
            copyOfParent.right = null;
        }
	}
}

module.exports = Node;
